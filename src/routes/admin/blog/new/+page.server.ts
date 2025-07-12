import { fail, isRedirect, redirect } from "@sveltejs/kit";
import { getRequestEvent } from "$app/server";
import { encodeBase32LowerCase } from "@oslojs/encoding";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { uploadToR2, validateImageFile } from "$lib/server/r2";
import { v7 } from "uuid";
import type { Actions, PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async () => {
  const user = requireLogin();
  return { user };
};

export const actions: Actions = {
  create: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
    const title = formData.get("title");
    const slug = formData.get("slug");
    const manualSummary = formData.get("manualSummary");
    const status = formData.get("status");
    const featuredImageFile = formData.get("featuredImage") as File;

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

    let featuredImageUrl: string | null = null;
    const postId = v7();

    // Handle featured image upload if provided
    if (featuredImageFile && featuredImageFile.size > 0) {
      const validation = validateImageFile(featuredImageFile);
      if (!validation.valid) {
        return fail(400, { message: validation.error });
      }

      try {
        const fileExtension = featuredImageFile.name.split(".").pop() || "jpg";
        const fileName = `blog/${postId}.${fileExtension}`;
        featuredImageUrl = await uploadToR2(featuredImageFile, fileName);
      } catch (error) {
        console.error("Error uploading featured image:", error);
        return fail(500, { message: "Failed to upload featured image" });
      }
    }

    try {
      await db.insert(table.blogPost).values({
        id: postId,
        title: title.trim(),
        slug: slug.trim(),
        manualSummary:
          manualSummary && typeof manualSummary === "string"
            ? manualSummary.trim() || null
            : null,
        featuredImage: featuredImageUrl,
        status: status as "draft" | "published",
      });

      return redirect(302, `/admin/blog/${postId}`);
    } catch (error) {
      if (isRedirect(error)) {
        redirect(error?.status, error?.location);
      }
      console.error("Error creating blog post:", error);
      return fail(500, { message: "Failed to create blog post" });
    }
  },

  generateAiSummary: async (event) => {
    requireLogin();

    const formData = await event.request.formData();
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
        const errorData = await response.json().catch(() => ({}));
        return fail(500, {
          message: errorData.message || "Failed to generate AI summary",
        });
      }

      const { aiSummary } = await response.json();
      return {
        success: true,
        aiSummary,
        message: "AI summary generated successfully",
      };
    } catch (error) {
      console.error("Error generating AI summary:", error);
      return fail(500, { message: "Failed to generate AI summary" });
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
