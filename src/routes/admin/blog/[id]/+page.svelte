<script lang="ts">
  import { enhance, applyAction } from "$app/forms";
  import type { PageServerData, ActionData } from "./$types";

  let { data, form }: { data: PageServerData; form: ActionData } = $props();
  let isSubmitting = $state(false);
  let removeFeaturedImage = $state(false);
  let editingBlock = $state<string | null>(null);
  let draggedBlock = $state<string | null>(null);
  let isGeneratingAi = $state(false);

  function parseBlockContent(content: string) {
    try {
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  function getYouTubeEmbedUrl(url: string) {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : "";
  }

  function handleDragStart(event: DragEvent, blockId: string) {
    draggedBlock = blockId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  function handleDrop(event: DragEvent, targetBlockId: string) {
    event.preventDefault();

    if (!draggedBlock || draggedBlock === targetBlockId) {
      draggedBlock = null;
      return;
    }

    const blocks = [...data.blocks];
    const draggedIndex = blocks.findIndex((b) => b.id === draggedBlock);
    const targetIndex = blocks.findIndex((b) => b.id === targetBlockId);

    if (draggedIndex === -1 || targetIndex === -1) {
      draggedBlock = null;
      return;
    }

    // Reorder blocks array
    const [draggedItem] = blocks.splice(draggedIndex, 1);
    blocks.splice(targetIndex, 0, draggedItem);

    // Update the data
    data.blocks = blocks;

    // Submit reorder to server
    const formData = new FormData();
    formData.append("blockIds", JSON.stringify(blocks.map((b) => b.id)));

    fetch("?/reorderBlocks", {
      method: "POST",
      body: formData,
    });

    draggedBlock = null;
  }
  async function generateAiSummary() {
    isGeneratingAi = true;

    const formData = new FormData();
    formData.append("title", data.post.title);
    formData.append("manualSummary", data.post.manualSummary || "");

    const response = await fetch("?/generateAiSummary", {
      method: "POST",
      body: formData,
    });
    applyAction(await response.json());
    isGeneratingAi = false;
  }
</script>

<svelte:head>
  <title>Edit Blog Post - Portfolio Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Navigation Header -->
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <a
            href="/admin/blog"
            class="text-sm text-gray-500 hover:text-gray-700 mr-4"
          >
            ← Back to Blog Posts
          </a>
          <h1 class="text-xl font-semibold text-gray-900">Edit Blog Post</h1>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      {#if form?.success}
        <div class="rounded-md bg-green-50 p-4 mb-6">
          <div class="text-sm text-green-700">
            {form.message}
          </div>
        </div>
      {/if}

      {#if form?.message && !form?.success}
        <div class="rounded-md bg-red-50 p-4 mb-6">
          <div class="text-sm text-red-700">
            {form.message}
          </div>
        </div>
      {/if}

      <!-- Blog Post Settings -->
      <div class="bg-white shadow sm:rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">
            Blog Post Settings
          </h2>
          <form
            method="post"
            action="?/update"
            enctype="multipart/form-data"
            use:enhance={() => {
              isSubmitting = true;
              return async ({ update }) => {
                await update();
                isSubmitting = false;
              };
            }}
          >
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <!-- Blog Post Title -->
              <div class="sm:col-span-2">
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700"
                >
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={data.post.title}
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter blog post title"
                />
              </div>

              <!-- Blog Post Slug -->
              <div>
                <label
                  for="slug"
                  class="block text-sm font-medium text-gray-700"
                >
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  value={data.post.slug}
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="url-friendly-slug"
                />
                <p class="mt-1 text-xs text-gray-500">
                  URL-friendly version of the title.
                </p>
              </div>

              <!-- Status -->
              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-gray-700"
                >
                  Status *
                </label>
                <select
                  name="status"
                  id="status"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="draft" selected={data.post.status === "draft"}>
                    Draft
                  </option>
                  <option
                    value="published"
                    selected={data.post.status === "published"}
                  >
                    Published
                  </option>
                </select>
              </div>

              <!-- Current Featured Image Display -->
              {#if data.post.featuredImage && !removeFeaturedImage}
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Current Featured Image
                  </label>
                  <div class="flex items-start space-x-4">
                    <img
                      src={data.post.featuredImage}
                      alt={data.post.title}
                      class="h-24 w-24 rounded-lg object-cover"
                    />
                    <div class="flex-1">
                      <button
                        type="button"
                        onclick={() => (removeFeaturedImage = true)}
                        class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              {/if}

              {#if removeFeaturedImage}
                <div class="sm:col-span-2">
                  <div class="rounded-md bg-yellow-50 p-4">
                    <div class="flex">
                      <div class="ml-3">
                        <h3 class="text-sm font-medium text-yellow-800">
                          Featured image will be removed
                        </h3>
                        <div class="mt-4">
                          <button
                            type="button"
                            onclick={() => (removeFeaturedImage = false)}
                            class="text-sm font-medium text-yellow-800 hover:text-yellow-600"
                          >
                            Keep current featured image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="removeFeaturedImage"
                    value="true"
                  />
                </div>
              {/if}

              <!-- Featured Image Upload -->
              <div class="sm:col-span-2">
                <label
                  for="featuredImage"
                  class="block text-sm font-medium text-gray-700"
                >
                  {data.post.featuredImage && !removeFeaturedImage
                    ? "Replace Featured Image"
                    : "Featured Image"}
                </label>
                <input
                  type="file"
                  name="featuredImage"
                  id="featuredImage"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <!-- Manual Summary -->
              <div class="sm:col-span-2">
                <label
                  for="manualSummary"
                  class="block text-sm font-medium text-gray-700"
                >
                  Summary
                </label>
                <textarea
                  name="manualSummary"
                  id="manualSummary"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Brief summary of the blog post"
                  >{data.post.manualSummary || ""}</textarea
                >
              </div>

              <!-- AI Summary Section -->
              <div class="sm:col-span-2">
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-medium text-gray-700" for="">
                    AI-Generated Summary
                  </label>
                  <button
                    type="button"
                    onclick={generateAiSummary}
                    disabled={isGeneratingAi}
                    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {#if isGeneratingAi}
                      <svg
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    {:else}
                      {data.post.aiSummary
                        ? "Regenerate AI Summary"
                        : "Generate AI Summary"}
                    {/if}
                  </button>
                  <!-- <form
                    method="post"
                    action="?/generateAiSummary"
                    use:enhance={() => {
                      isGeneratingAi = true;
                      return async ({ update }) => {
                        await update();
                        isGeneratingAi = false;
                      };
                    }}
                  >
                    <input type="hidden" name="title" value={data.post.title} />
                    <input
                      type="hidden"
                      name="manualSummary"
                      value={data.post.manualSummary || ""}
                    />
                    <button
                      type="submit"
                      disabled={isGeneratingAi}
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {#if isGeneratingAi}
                        <svg
                          class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Generating...
                      {:else}
                        {data.post.aiSummary
                          ? "Regenerate AI Summary"
                          : "Generate AI Summary"}
                      {/if}
                    </button>
                  </form> -->
                </div>
                {#if data.post.aiSummary || form?.aiSummary}
                  <div
                    class="mt-1 p-3 bg-blue-50 border border-blue-200 rounded-md"
                  >
                    <p class="text-sm text-blue-800">
                      {form?.aiSummary || data.post.aiSummary}
                    </p>
                  </div>
                {:else}
                  <p class="text-xs text-gray-500">
                    Click "Generate AI Summary" to create an AI-powered summary
                    for this blog post.
                  </p>
                {/if}
              </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating..." : "Update Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Block Editor Section -->
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Content Blocks</h3>
              <p class="text-sm text-gray-500">
                Build your blog post content using different types of blocks.
                Drag to reorder.
              </p>
            </div>
            <div class="flex space-x-2">
              <form method="post" action="?/addBlock" use:enhance>
                <input type="hidden" name="type" value="text" />
                <button
                  type="submit"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  + Text
                </button>
              </form>
              <form method="post" action="?/addBlock" use:enhance>
                <input type="hidden" name="type" value="image" />
                <button
                  type="submit"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  + Image
                </button>
              </form>
              <form method="post" action="?/addBlock" use:enhance>
                <input type="hidden" name="type" value="youtube" />
                <button
                  type="submit"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  + YouTube
                </button>
              </form>
              <form method="post" action="?/addBlock" use:enhance>
                <input type="hidden" name="type" value="link" />
                <button
                  type="submit"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  + Link
                </button>
              </form>
            </div>
          </div>

          {#if data.blocks.length > 0}
            <div class="space-y-4">
              {#each data.blocks as block, index}
                {@const content = parseBlockContent(block.content as any)}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="border border-gray-200 rounded-lg p-4 cursor-move hover:border-gray-300 transition-colors"
                  draggable="true"
                  ondragstart={(e) => handleDragStart(e, block.id)}
                  ondragover={handleDragOver}
                  ondrop={(e) => handleDrop(e, block.id)}
                >
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-2">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {block.type}
                      </span>
                      <span class="text-xs text-gray-500">#{index + 1}</span>
                      <svg
                        class="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 8h16M4 16h16"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button
                        type="button"
                        onclick={() =>
                          (editingBlock =
                            editingBlock === block.id ? null : block.id)}
                        class="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {editingBlock === block.id ? "Cancel" : "Edit"}
                      </button>
                      <form method="post" action="?/deleteBlock" use:enhance>
                        <input type="hidden" name="blockId" value={block.id} />
                        <button
                          type="submit"
                          onclick={() => {
                            return confirm(
                              "Are you sure you want to delete this block?"
                            );
                          }}
                          class="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>

                  {#if editingBlock === block.id}
                    <!-- Edit Mode -->
                    <form
                      method="post"
                      action="?/updateBlock"
                      enctype="multipart/form-data"
                      use:enhance
                    >
                      <input type="hidden" name="blockId" value={block.id} />
                      <input
                        type="hidden"
                        name="blockType"
                        value={block.type}
                      />

                      {#if block.type === "text"}
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Content</label
                          >
                          <textarea
                            name="content"
                            rows="6"
                            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your text content here..."
                            >{content.content || ""}</textarea
                          >
                        </div>
                      {:else if block.type === "image"}
                        <div class="space-y-4">
                          {#if content.url}
                            <div>
                              <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                                >Current Image</label
                              >
                              <img
                                src={content.url}
                                alt={content.alt}
                                class="h-32 w-auto rounded-lg"
                              />
                            </div>
                          {/if}
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                            >
                              {content.url ? "Replace Image" : "Upload Image"}
                            </label>
                            <input
                              type="file"
                              name="image"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                              >Alt Text</label
                            >
                            <input
                              type="text"
                              name="alt"
                              value={content.alt || ""}
                              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="Describe the image for accessibility"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                              >Caption</label
                            >
                            <input
                              type="text"
                              name="caption"
                              value={content.caption || ""}
                              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="Optional caption"
                            />
                          </div>
                        </div>
                      {:else if block.type === "youtube"}
                        <div class="space-y-4">
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                              >YouTube URL</label
                            >
                            <input
                              type="url"
                              name="url"
                              value={content.url || ""}
                              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="https://www.youtube.com/watch?v=..."
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                              >Title</label
                            >
                            <input
                              type="text"
                              name="title"
                              value={content.title || ""}
                              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="Video title"
                            />
                          </div>
                        </div>
                      {:else if block.type === "link"}
                        <div class="space-y-4">
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                              >URL</label
                            >
                            <input
                              type="url"
                              name="url"
                              value={content.url || ""}
                              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="https://example.com"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                              >Title</label
                            >
                            <input
                              type="text"
                              name="title"
                              value={content.title || ""}
                              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="Link title"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-700 mb-2"
                              >Description</label
                            >
                            <textarea
                              name="description"
                              rows="3"
                              class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              placeholder="Brief description of the link"
                              >{content.description || ""}</textarea
                            >
                          </div>
                        </div>
                      {/if}

                      <div class="mt-4 flex justify-end space-x-2">
                        <button
                          type="button"
                          onclick={() => (editingBlock = null)}
                          class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          class="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Save Block
                        </button>
                      </div>
                    </form>
                  {:else}
                    <!-- Display Mode -->
                    {#if block.type === "text"}
                      <div class="prose max-w-none">
                        {#if content.content}
                          <div class="whitespace-pre-wrap text-gray-700">
                            {content.content}
                          </div>
                        {:else}
                          <div class="text-gray-400 italic">
                            Empty text block - click Edit to add content
                          </div>
                        {/if}
                      </div>
                    {:else if block.type === "image"}
                      {#if content.url}
                        <div>
                          <img
                            src={content.url}
                            alt={content.alt || ""}
                            class="max-w-full h-auto rounded-lg"
                          />
                          {#if content.caption}
                            <p class="text-sm text-gray-600 mt-2 italic">
                              {content.caption}
                            </p>
                          {/if}
                        </div>
                      {:else}
                        <div class="text-gray-400 italic">
                          No image uploaded - click Edit to add an image
                        </div>
                      {/if}
                    {:else if block.type === "youtube"}
                      {#if content.url}
                        {@const embedUrl = getYouTubeEmbedUrl(content.url)}
                        {#if embedUrl}
                          <div>
                            {#if content.title}
                              <h4
                                class="text-lg font-medium text-gray-900 mb-2"
                              >
                                {content.title}
                              </h4>
                            {/if}
                            <div class="aspect-video">
                              <iframe
                                src={embedUrl}
                                title={content.title || "YouTube video"}
                                class="w-full h-full rounded-lg"
                                frameborder="0"
                                allowfullscreen
                              ></iframe>
                            </div>
                          </div>
                        {:else}
                          <div class="text-red-400 italic">
                            Invalid YouTube URL - click Edit to fix
                          </div>
                        {/if}
                      {:else}
                        <div class="text-gray-400 italic">
                          No YouTube URL - click Edit to add a video
                        </div>
                      {/if}
                    {:else if block.type === "link"}
                      {#if content.url}
                        <div
                          class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                        >
                          <a
                            href={content.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="block"
                          >
                            {#if content.title}
                              <h4
                                class="text-lg font-medium text-blue-600 hover:text-blue-800"
                              >
                                {content.title}
                              </h4>
                            {/if}
                            {#if content.description}
                              <p class="text-gray-600 mt-1">
                                {content.description}
                              </p>
                            {/if}
                            <p class="text-sm text-gray-500 mt-2">
                              {content.url}
                            </p>
                          </a>
                        </div>
                      {:else}
                        <div class="text-gray-400 italic">
                          No URL provided - click Edit to add a link
                        </div>
                      {/if}
                    {/if}
                  {/if}
                </div>
              {/each}
            </div>
          {:else}
            <div
              class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
            >
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">
                No content blocks
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Get started by adding your first content block above.
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </main>
</div>
