<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData, ActionData } from "./$types";
  import { Turnstile } from "svelte-turnstile";
  let robotButtonClicked = $state(false),
    humanVerified = $state(false);
  let { data, form }: { data: PageServerData; form: ActionData } = $props();
  let isSubmitting = $state(false);
  // Call this to reset the turnstile
  let reset = $state<() => void>();

  //   $effect(() => {
  //     console.log("form.cf-turnstile-response", form);
  //   });
</script>

<svelte:head>
  <title>Contact - Portfolio</title>
  <meta
    name="description"
    content="Get in touch to discuss your next project. I'm available for freelance work, consulting, and collaboration opportunities."
  />
  <meta
    name="keywords"
    content="contact, hire, freelance, web development, consultation, project inquiry, collaboration"
  />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Contact - Portfolio" />
  <meta
    property="og:description"
    content="Get in touch to discuss your next project. I'm available for freelance work, consulting, and collaboration opportunities."
  />
  <meta property="og:url" content="/contact" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:title" content="Contact - Portfolio" />
  <meta
    property="twitter:description"
    content="Get in touch to discuss your next project. I'm available for freelance work, consulting, and collaboration opportunities."
  />

  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "ContactPage",
			"name": "Contact",
			"description": "Get in touch to discuss your next project",
			"url": "/contact"
		}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
        >
          Let's Work Together
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Have a project in mind? I'd love to hear about it. Whether you need a
          complete web application, a redesign, or just want to discuss ideas,
          I'm here to help bring your vision to life.
        </p>
      </div>
    </div>
  </section>

  <!-- Contact Form Section -->
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {#if form?.success}
        <div class="rounded-xl bg-green-50 p-6 mb-8 border border-green-200">
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-green-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div class="text-green-800">
              <h3 class="font-semibold">Message Sent Successfully!</h3>
              <p class="text-sm">{form.message}</p>
            </div>
          </div>
        </div>
      {/if}

      {#if form?.message && !form?.success}
        <div class="rounded-xl bg-red-50 p-6 mb-8 border border-red-200">
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-red-600 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div class="text-red-800">
              <h3 class="font-semibold">Error</h3>
              <p class="text-sm">{form.message}</p>
            </div>
          </div>
        </div>
      {/if}

      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Contact Information -->
        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            <div class="space-y-6">
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Email</h3>
                  <p class="text-gray-600">devemm01@gmail.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Response Time</h3>
                  <p class="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-5 h-5 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Location</h3>
                  <p class="text-gray-600">Available worldwide (Remote)</p>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-100">
              <h3 class="font-semibold text-gray-900 mb-4">
                What I Can Help With
              </h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Web Application Development
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Frontend & Backend Development
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Technical Consulting
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Code Reviews & Optimization
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div
            class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Send Me a Message
            </h2>

            <form
              method="post"
              action="?/submit"
              use:enhance={() => {
                isSubmitting = true;
                return async ({ update }) => {
                  await update();
                  isSubmitting = false;
                  reset?.();
                };
              }}
            >
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Name -->
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <!-- Company -->
                <div>
                  <label
                    for="company"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <!-- Budget -->
                <div>
                  <label
                    for="budget"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    id="budget"
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                  </select>
                </div>

                <!-- Subject -->
                <div class="sm:col-span-2">
                  <label
                    for="subject"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <!-- Timeline -->
                <div class="sm:col-span-2">
                  <label
                    for="timeline"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Timeline
                  </label>
                  <select
                    name="timeline"
                    id="timeline"
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-months-plus">6+ months</option>
                    <option value="just-exploring">Just exploring</option>
                  </select>
                </div>

                <!-- Message -->
                <div class="sm:col-span-2">
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    required
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  ></textarea>
                </div>
              </div>

              <!-- Cloudflare Turnstile -->
              <div class="flex items-center justify-center my-3">
                {#if robotButtonClicked}
                  <Turnstile
                    theme="light"
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    responseFieldName="cfTurnstileResponse"
                    size="flexible"
                    appearance="always"
                    execution="render"
                    retry="never"
                    bind:reset
                    on:callback={(e) => {
                      humanVerified = true;
                    }}
                    on:error={(e) => {
                      console.log(e.detail);
                      humanVerified = false;
                      robotButtonClicked = false;
                      // reset?.();
                      // form.errors.update((errors) => ({
                      //   ...errors,
                      //   cfTurnstileResponse: [
                      //     `${e.detail.code}: invalid captcha`,
                      //   ],
                      // }));
                    }}
                    on:expired={() => {
                      humanVerified = false;
                      reset?.();
                    }}
                  />
                {:else}
                  <!-- div appearing nice like turnstile box with checkbox with not a robot label box -->
                  <div
                    class="border border-opacity-70 border-gray-300 !bg-[#fafafa] rounded-xs p-4 flex justify-between items-center w-full h-[65px]"
                  >
                    <div>
                      <input
                        type="checkbox"
                        id="robot"
                        name="robot"
                        value="robot"
                        class="hidden"
                        onclick={() => {
                          robotButtonClicked = true;
                        }}
                      />
                      <label
                        for="robot"
                        class="text-sm font-light flex items-center space-x-2"
                      >
                        <span
                          class="w-6 h-6 border rounded-sm border-[#6d6d6d] inline-block bg-white"
                        ></span>
                        <span class="">Verify you are human</span>
                      </label>
                    </div>
                    <div id="branding flex">
                      <a
                        class="cf-link text-black"
                        target="_blank"
                        href="https://www.cloudflare.com/products/turnstile/?utm_source=turnstile&amp;utm_campaign=widget"
                        rel="noopener noreferrer"
                        aria-label="Cloudflare"
                      >
                        <svg
                          role="img"
                          aria-label="Cloudflare"
                          id="logo"
                          viewBox="0 0 74 25"
                          fill="black"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M61.8848 15.7841L62.0632 15.1578C62.2758 14.4126 62.1967 13.7239 61.8401 13.2178C61.5118 12.7517 60.9649 12.4773 60.3007 12.4453L47.7201 12.2836C47.6811 12.2829 47.6428 12.2728 47.6083 12.2542C47.5738 12.2356 47.5442 12.209 47.5217 12.1766C47.4996 12.1431 47.4856 12.1049 47.4807 12.0649C47.4758 12.025 47.4801 11.9844 47.4933 11.9465C47.5149 11.8839 47.5541 11.8291 47.6061 11.7888C47.658 11.7486 47.7204 11.7247 47.7856 11.72L60.4827 11.5566C61.9889 11.4864 63.6196 10.2462 64.1905 8.73372L64.9146 6.81361C64.9443 6.73242 64.951 6.64444 64.9341 6.55957C64.112 2.80652 60.8115 0 56.8652 0C53.2293 0 50.1421 2.38158 49.0347 5.69186C48.2864 5.12186 47.3535 4.85982 46.4228 4.95823C44.6785 5.13401 43.276 6.55928 43.1034 8.32979C43.059 8.77189 43.0915 9.21845 43.1992 9.64918C40.3497 9.73347 38.0645 12.1027 38.0645 15.0151C38.0649 15.2751 38.0838 15.5347 38.1212 15.7919C38.1294 15.8513 38.1584 15.9057 38.2029 15.9452C38.2474 15.9847 38.3044 16.0067 38.3635 16.0071L61.5894 16.0099C61.5916 16.0101 61.5938 16.0101 61.596 16.0099C61.6616 16.0088 61.7252 15.9862 61.7772 15.9455C61.8293 15.9049 61.867 15.8483 61.8848 15.7841Z"
                            fill="#F6821F"
                          ></path>
                          <path
                            d="M66.0758 6.95285C65.9592 6.95285 65.843 6.95582 65.7274 6.96177C65.7087 6.96312 65.6904 6.96719 65.6729 6.97385C65.6426 6.98437 65.6152 7.00219 65.5931 7.02579C65.5711 7.04939 65.555 7.07806 65.5462 7.10936L65.0515 8.84333C64.8389 9.58847 64.918 10.2766 65.2749 10.7827C65.6029 11.2494 66.1498 11.5233 66.814 11.5552L69.4959 11.7186C69.5336 11.7199 69.5705 11.73 69.6037 11.7483C69.6369 11.7666 69.6654 11.7925 69.687 11.8239C69.7092 11.8576 69.7234 11.896 69.7283 11.9363C69.7332 11.9765 69.7288 12.0173 69.7153 12.0555C69.6937 12.118 69.6546 12.1727 69.6028 12.2129C69.5509 12.2531 69.4887 12.2771 69.4236 12.2819L66.6371 12.4453C65.1241 12.5161 63.4937 13.7558 62.9233 15.2682L62.722 15.8022C62.7136 15.8245 62.7105 15.8486 62.713 15.8724C62.7155 15.8961 62.7236 15.9189 62.7365 15.9389C62.7495 15.9589 62.7669 15.9755 62.7874 15.9873C62.8079 15.9991 62.8309 16.0058 62.8544 16.0068C62.8569 16.0068 62.8592 16.0068 62.8618 16.0068H72.4502C72.506 16.0073 72.5604 15.9893 72.6051 15.9554C72.6498 15.9216 72.6823 15.8739 72.6977 15.8195C72.8677 15.2043 72.9535 14.5684 72.9529 13.9296C72.9517 10.0767 69.8732 6.95285 66.0758 6.95285Z"
                            fill="#FBAD41"
                          ></path>
                          <path
                            d="M8.11963 18.8904H9.75541V23.4254H12.6139V24.8798H8.11963V18.8904Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M14.3081 21.9023V21.8853C14.3081 20.1655 15.674 18.7704 17.4952 18.7704C19.3164 18.7704 20.6653 20.1482 20.6653 21.8681V21.8853C20.6653 23.6052 19.2991 24.9994 17.4785 24.9994C15.6578 24.9994 14.3081 23.6222 14.3081 21.9023ZM18.9958 21.9023V21.8853C18.9958 21.0222 18.3806 20.2679 17.4785 20.2679C16.5846 20.2679 15.9858 21.0038 15.9858 21.8681V21.8853C15.9858 22.7484 16.6013 23.5025 17.4952 23.5025C18.3973 23.5025 18.9958 22.7666 18.9958 21.9023Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M22.6674 22.253V18.8901H24.3284V22.2191C24.3284 23.0822 24.7584 23.4939 25.4159 23.4939C26.0733 23.4939 26.5034 23.1003 26.5034 22.2617V18.8901H28.1647V22.2093C28.1647 24.1432 27.0772 24.9899 25.3991 24.9899C23.7211 24.9899 22.6674 24.1268 22.6674 22.2522"
                            class="logo-text"
                          ></path>
                          <path
                            d="M30.668 18.8907H32.9445C35.0526 18.8907 36.275 20.1226 36.275 21.8508V21.8684C36.275 23.5963 35.0355 24.88 32.911 24.88H30.668V18.8907ZM32.97 23.4076C33.9483 23.4076 34.597 22.8609 34.597 21.8928V21.8759C34.597 20.9178 33.9483 20.3614 32.97 20.3614H32.3038V23.4082L32.97 23.4076Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M38.6525 18.8904H43.3738V20.3453H40.2883V21.3632H43.079V22.7407H40.2883V24.8798H38.6525V18.8904Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M45.65 18.8904H47.2858V23.4254H50.1443V24.8798H45.65V18.8904Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M54.4187 18.8475H55.9949L58.5079 24.8797H56.7541L56.3238 23.8101H54.047L53.6257 24.8797H51.9058L54.4187 18.8475ZM55.8518 22.5183L55.1941 20.8154L54.5278 22.5183H55.8518Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M60.6149 18.8901H63.4056C64.3083 18.8901 64.9317 19.13 65.328 19.5406C65.6742 19.883 65.8511 20.3462 65.8511 20.9357V20.9526C65.8511 21.8678 65.3691 22.4754 64.6369 22.7919L66.045 24.88H64.1558L62.9671 23.0658H62.2507V24.88H60.6149V18.8901ZM63.3299 21.7654C63.8864 21.7654 64.2071 21.4915 64.2071 21.0551V21.0381C64.2071 20.5674 63.8697 20.328 63.3211 20.328H62.2507V21.7665L63.3299 21.7654Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M68.2112 18.8904H72.9578V20.3024H69.8302V21.209H72.6632V22.5183H69.8302V23.4683H73V24.8798H68.2112V18.8904Z"
                            class="logo-text"
                          ></path>
                          <path
                            d="M4.53824 22.6043C4.30918 23.13 3.82723 23.5022 3.18681 23.5022C2.29265 23.5022 1.67746 22.7493 1.67746 21.8851V21.8678C1.67746 21.0047 2.27593 20.2676 3.1698 20.2676C3.84367 20.2676 4.35681 20.6882 4.5734 21.2605H6.29764C6.02151 19.8349 4.78716 18.7707 3.18681 18.7707C1.36533 18.7707 0 20.1666 0 21.8851V21.9021C0 23.6219 1.3486 25 3.1698 25C4.72762 25 5.94525 23.9764 6.26645 22.6046L4.53824 22.6043Z"
                            class="logo-text"
                          >
                          </path>
                        </svg>
                      </a>
                      <div id="terms !text-xs">
                        <a
                          id="privacy-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.cloudflare.com/privacypolicy/"
                          class="underline text-[8px]">Privacy</a
                        >
                        <span class="link-spacer text-[8px]"> • </span>
                        <a
                          id="terms-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.cloudflare.com/website-terms/"
                          class="underline text-[8px]">Terms</a
                        >
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
              <!-- Submit Button -->
              <div class="mt-4 flex items-center justify-center my-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !humanVerified}
                  class="w-full sm:w-autox flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {#if isSubmitting}
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Sending...
                  {:else}
                    Send Message
                    <svg
                      class="ml-2 w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  {/if}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <p class="text-lg text-gray-600">
          Quick answers to common questions about working together.
        </p>
      </div>

      <div class="space-y-8">
        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            What's your typical project timeline?
          </h3>
          <p class="text-gray-600">
            Project timelines vary depending on scope and complexity. A simple
            website might take 2-4 weeks, while a complex web application could
            take 2-6 months. I'll provide a detailed timeline estimate after our
            initial discussion.
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            Do you work with international clients?
          </h3>
          <p class="text-gray-600">
            Absolutely! I work with clients worldwide and am comfortable with
            remote collaboration. I'm flexible with time zones and use modern
            communication tools to ensure smooth project delivery.
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            What technologies do you specialize in?
          </h3>
          <p class="text-gray-600">
            I specialize in modern web technologies including React, Svelte,
            Node.js, TypeScript, Golang, Python, PHP and various databases. I
            choose the best technology stack based on your project's specific
            requirements and goals.
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            Do you provide ongoing support after project completion?
          </h3>
          <p class="text-gray-600">
            Yes! I offer various support and maintenance packages to keep your
            application running smoothly. This includes bug fixes, security
            updates, performance optimization, and feature enhancements.
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
