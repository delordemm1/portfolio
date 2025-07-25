import { eq } from "drizzle-orm";
import { error, fail, isRedirect, redirect } from "@sveltejs/kit";
import { getRequestEvent } from "$app/server";
import { encodeBase32LowerCase } from "@oslojs/encoding";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import {
  uploadToR2,
  validateImageFile,
  deleteFromR2,
  getR2KeyFromUrl,
} from "$lib/server/r2";
import { v7 } from "uuid";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const user = requireLogin();

  const [post] = await db
    .select()
    .from(table.blogPost)
    .where(eq(table.blogPost.id, params.id));

  if (!post) {
    throw error(404, "Blog post not found");
  }

  const blocks = await db
    .select()
    .from(table.blogBlock)
    .where(eq(table.blogBlock.postId, params.id))
    .orderBy(table.blogBlock.order);

  return { user, post, blocks };
};

export const actions: Actions = {
  update: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
    const postId = event.params.id;
    const title = formData.get("title");
    const slug = formData.get("slug");
    const manualSummary = formData.get("manualSummary");
    const status = formData.get("status");
    const featuredImageFile = formData.get("featuredImage") as File;
    const removeFeaturedImage = formData.get("removeFeaturedImage") === "true";

    // Validation
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return fail(400, { message: "Blog post title is required" });
    }

    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return fail(400, { message: "Blog post slug is required" });
    }

    // Validate slug format (URL-friendly)
    if (!/^[a-z0-9-]+$/.test(slug.trim())) {
      return fail(400, {
        message:
          "Slug must contain only lowercase letters, numbers, and hyphens",
      });
    }

    if (!status || (status !== "draft" && status !== "published")) {
      return fail(400, { message: "Invalid status" });
    }

    try {
      // Get current post data
      const [currentPost] = await db
        .select()
        .from(table.blogPost)
        .where(eq(table.blogPost.id, postId));

      if (!currentPost) {
        return fail(404, { message: "Blog post not found" });
      }

      let featuredImageUrl = currentPost.featuredImage;

      // Handle featured image removal
      if (removeFeaturedImage && currentPost.featuredImage) {
        const r2Key = getR2KeyFromUrl(currentPost.featuredImage);
        if (r2Key) {
          await deleteFromR2(r2Key);
        }
        featuredImageUrl = null;
      }

      // Handle new featured image upload
      if (featuredImageFile && featuredImageFile.size > 0) {
        const validation = validateImageFile(featuredImageFile);
        if (!validation.valid) {
          return fail(400, { message: validation.error });
        }

        // Delete old featured image if it exists and we're uploading a new one
        if (currentPost.featuredImage && !removeFeaturedImage) {
          const r2Key = getR2KeyFromUrl(currentPost.featuredImage);
          if (r2Key) {
            await deleteFromR2(r2Key);
          }
        }

        // Upload new featured image
        const fileExtension = featuredImageFile.name.split(".").pop() || "jpg";
        const fileName = `blog/${v7()}.${fileExtension}`;
        featuredImageUrl = await uploadToR2(featuredImageFile, fileName);
      }

      // Update blog post in database
      await db
        .update(table.blogPost)
        .set({
          title: title.trim(),
          slug: slug.trim(),
          manualSummary:
            manualSummary && typeof manualSummary === "string"
              ? manualSummary.trim() || null
              : null,
          featuredImage: featuredImageUrl,
          status: status as "draft" | "published",
          updatedAt: new Date(),
        })
        .where(eq(table.blogPost.id, postId));

      return redirect(302, "/admin/blog");
    } catch (error) {
      if (isRedirect(error)) {
        redirect(error?.status, error?.location);
      }
      console.error("Error updating blog post:", error, isRedirect(error));
      return fail(500, { message: "Failed to update blog post" });
    }
  },

  generateAiSummary: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
    const postId = event.params.id;
    const title = formData.get("title");
    const manualSummary = formData.get("manualSummary");

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return fail(400, { message: "Title is required to generate AI summary" });
    }

    try {
      // Call our AI summary API endpoint
      const response = await fetch(
        `${event.url.origin}/api/generate-ai-summary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            manualSummary:
              manualSummary && typeof manualSummary === "string"
                ? manualSummary.trim()
                : null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(console.log);
        return fail(500, {
          message: errorData.message || "Failed to generate AI summary",
        });
      }

      const { aiSummary } = await response.json();

      // Update the blog post with the AI summary
      await db
        .update(table.blogPost)
        .set({
          aiSummary: aiSummary,
          updatedAt: new Date(),
        })
        .where(eq(table.blogPost.id, postId));
      console.log({ aiSummary });
      return {
        success: true,
        aiSummary,
        message: "AI summary generated and saved successfully",
      };
    } catch (error) {
      console.error("Error generating AI summary:", error);
      return fail(500, { message: "Failed to generate AI summary" });
    }
  },

  addBlock: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
    const postId = event.params.id;
    const type = formData.get("type");

    if (!type || typeof type !== "string") {
      return fail(400, { message: "Block type is required" });
    }

    if (!["text", "image", "youtube", "link"].includes(type)) {
      return fail(400, { message: "Invalid block type" });
    }

    try {
      // Get the highest order number for this post
      const blocks = await db
        .select()
        .from(table.blogBlock)
        .where(eq(table.blogBlock.postId, postId));

      const maxOrder =
        blocks.length > 0 ? Math.max(...blocks.map((b) => b.order)) : -1;
      const newOrder = maxOrder + 1;

      // Create default content based on type
      let defaultContent = {};
      switch (type) {
        case "text":
          defaultContent = { content: "" };
          break;
        case "image":
          defaultContent = { url: "", alt: "", caption: "" };
          break;
        case "youtube":
          defaultContent = { url: "", title: "" };
          break;
        case "link":
          defaultContent = { url: "", title: "", description: "" };
          break;
      }

      const blockId = v7();
      await db.insert(table.blogBlock).values({
        id: blockId,
        postId,
        type: type as any,
        content: JSON.stringify(defaultContent),
        order: newOrder,
      });

      return { success: true, message: `${type} block added successfully` };
    } catch (error) {
      console.error("Error adding block:", error);
      return fail(500, { message: "Failed to add block" });
    }
  },

  updateBlock: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
    const blockId = formData.get("blockId");
    const type = formData.get("blockType");
    const imageFile = formData.get("image") as File;

    if (!blockId || typeof blockId !== "string") {
      return fail(400, { message: "Block ID is required" });
    }

    try {
      // Get current block
      const [currentBlock] = await db
        .select()
        .from(table.blogBlock)
        .where(eq(table.blogBlock.id, blockId));

      if (!currentBlock) {
        return fail(404, { message: "Block not found" });
      }

      let content = {};

      switch (type) {
        case "text":
          const textContent = formData.get("content");
          if (typeof textContent === "string") {
            content = { content: textContent };
          }
          break;

        case "image":
          const alt = formData.get("alt");
          const caption = formData.get("caption");

          // Parse current content to get existing URL
          let currentContent: {
            url?: string;
            alt?: string;
          } = {};
          try {
            currentContent = JSON.parse(currentBlock.content as string);
          } catch (e) {
            console.error("Error parsing current block content:", e);
          }

          let imageUrl = currentContent.url || "";

          // Handle new image upload
          if (imageFile && imageFile.size > 0) {
            const validation = validateImageFile(imageFile);
            if (!validation.valid) {
              return fail(400, { message: validation.error });
            }

            // Delete old image if it exists
            if (currentContent.url) {
              const r2Key = getR2KeyFromUrl(currentContent.url);
              if (r2Key) {
                await deleteFromR2(r2Key);
              }
            }

            // Upload new image
            const fileExtension = imageFile.name.split(".").pop() || "jpg";
            const fileName = `blog/blocks/${v7()}.${fileExtension}`;
            imageUrl = await uploadToR2(imageFile, fileName);
          }

          content = {
            url: imageUrl,
            alt: typeof alt === "string" ? alt : "",
            caption: typeof caption === "string" ? caption : "",
          };
          break;

        case "youtube":
          const youtubeUrl = formData.get("url");
          const youtubeTitle = formData.get("title");
          content = {
            url: typeof youtubeUrl === "string" ? youtubeUrl : "",
            title: typeof youtubeTitle === "string" ? youtubeTitle : "",
          };
          break;

        case "link":
          const linkUrl = formData.get("url");
          const linkTitle = formData.get("title");
          const linkDescription = formData.get("description");
          content = {
            url: typeof linkUrl === "string" ? linkUrl : "",
            title: typeof linkTitle === "string" ? linkTitle : "",
            description:
              typeof linkDescription === "string" ? linkDescription : "",
          };
          break;

        default:
          return fail(400, { message: "Invalid block type" });
      }

      // Update block
      await db
        .update(table.blogBlock)
        .set({
          content: JSON.stringify(content),
        })
        .where(eq(table.blogBlock.id, blockId));

      return { success: true, message: "Block updated successfully" };
    } catch (error) {
      console.error("Error updating block:", error);
      return fail(500, { message: "Failed to update block" });
    }
  },

  deleteBlock: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
    const blockId = formData.get("blockId");

    if (!blockId || typeof blockId !== "string") {
      return fail(400, { message: "Block ID is required" });
    }

    try {
      // Get the block to delete any associated images
      const [block] = await db
        .select()
        .from(table.blogBlock)
        .where(eq(table.blogBlock.id, blockId));

      if (!block) {
        return fail(404, { message: "Block not found" });
      }

      // Delete image from R2 if it's an image block
      if (block.type === "image") {
        try {
          const content = JSON.parse(block.content as any);
          if (content.url) {
            const r2Key = getR2KeyFromUrl(content.url);
            if (r2Key) {
              await deleteFromR2(r2Key);
            }
          }
        } catch (e) {
          console.error("Error parsing block content for deletion:", e);
        }
      }

      // Delete the block
      await db.delete(table.blogBlock).where(eq(table.blogBlock.id, blockId));

      return { success: true, message: "Block deleted successfully" };
    } catch (error) {
      console.error("Error deleting block:", error);
      return fail(500, { message: "Failed to delete block" });
    }
  },

  reorderBlocks: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
    const postId = event.params.id;
    const blockIds = formData.get("blockIds");

    if (!blockIds || typeof blockIds !== "string") {
      return fail(400, { message: "Block IDs are required" });
    }

    try {
      const ids = JSON.parse(blockIds);
      if (!Array.isArray(ids)) {
        return fail(400, { message: "Invalid block IDs format" });
      }

      // Update the order of each block
      for (let i = 0; i < ids.length; i++) {
        await db
          .update(table.blogBlock)
          .set({ order: i })
          .where(eq(table.blogBlock.id, ids[i]));
      }

      return { success: true, message: "Blocks reordered successfully" };
    } catch (error) {
      console.error("Error reordering blocks:", error);
      return fail(500, { message: "Failed to reorder blocks" });
    }
  },
};

function requireLogin() {
  const { locals } = getRequestEvent();

  if (!locals.user) {
    return redirect(302, "/admin/login");
  }

  return locals.user;
}
