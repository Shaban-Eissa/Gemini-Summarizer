import { Component } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  template: `
    <header class="mx-auto max-w-4xl px-2 sm:px-0">
      <div class="flex flex-col items-center text-center gap-4">
        <div class="flex flex-col items-center">
          <div
            class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-3.5 w-3.5"
            >
              <path
                d="M12 2a1 1 0 0 1 .894.553l2.118 4.286 4.73.687a1 1 0 0 1 .554 1.706l-3.424 3.338.808 4.707a1 1 0 0 1-1.451 1.054L12 17.77l-4.229 2.222a1 1 0 0 1-1.451-1.054l.808-4.707L3.704 9.232a1 1 0 0 1 .554-1.706l4.73-.687L11.106 2.553A1 1 0 0 1 12 2Z"
              />
            </svg>
            <span>Fast, clean, concise</span>
          </div>
          <h1
            class="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            AI Article Summarizer
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Paste a URL or text. Choose a style. Get a summary you can share.
          </p>

          <div
            class="mt-3 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400"
          >
            <div class="flex items-center gap-1.5">
              <svg
                class="w-3.5 h-3.5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <span class="hidden sm:inline">Powered by Google Gemini AI</span>
              <span class="sm:hidden">Gemini AI</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg
                class="w-3.5 h-3.5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="hidden sm:inline">Instant processing</span>
              <span class="sm:hidden">Instant</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg
                class="w-3.5 h-3.5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="hidden sm:inline">Multiple output styles</span>
              <span class="sm:hidden">Multi-style</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderBarComponent {}
