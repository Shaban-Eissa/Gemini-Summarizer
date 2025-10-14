import { Component, EventEmitter, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary-modal',
  standalone: true,
  imports: [DatePipe],
  template: `
    @if (open()) {
    <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        (click)="close.emit()"
      ></div>

      <div
        class="relative w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 dark:bg-gray-900"
      >
        <div
          class="flex items-center justify-between p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/30"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <div>
              <h3
                class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white"
              >
                Summary Details
              </h3>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Generated {{ item()?.createdAt | date : 'short' }}
              </p>
            </div>
          </div>
          <button
            (click)="close.emit()"
            class="rounded-lg p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors dark:hover:text-gray-300 dark:hover:bg-gray-800"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div
          class="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-140px)]"
        >
          <div class="mb-4 sm:mb-6">
            <h4
              class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3"
            >
              Summary
            </h4>
            <div
              class="prose prose-sm sm:prose-lg max-w-none dark:prose-invert"
            >
              <div
                [innerHTML]="item()?.summary"
                class="text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base"
              ></div>
            </div>
          </div>

          @if (item()?.url) {
          <div class="mb-4 sm:mb-6">
            <h4
              class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Source URL
            </h4>
            <a
              [href]="item()?.url"
              target="_blank"
              class="inline-flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm break-all"
            >
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              {{ item()?.url }}
            </a>
          </div>
          }

          <div class="mb-4 sm:mb-6">
            <h4
              class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Summary Style
            </h4>
            <span
              class="inline-flex items-center rounded-full bg-gray-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            >
              {{ item()?.style }}
            </span>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-6 border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 rounded-b-xl sm:rounded-b-2xl gap-3 sm:gap-0"
        >
          <div
            class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4"
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
            <span class="hidden sm:inline">ID: {{ item()?.id }}</span>
            <span class="sm:hidden">ID: {{ item()?.id?.slice(0, 8) }}...</span>
          </div>
          <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              (click)="close.emit()"
              class="flex-1 sm:flex-none rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Close
            </button>
            <a
              [href]="apiUrl() + '/summary/' + (item()?.id || '')"
              target="_blank"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-2 rounded-lg bg-blue-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              <span class="hidden sm:inline">Open in API</span>
              <span class="sm:hidden">API</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    }
  `,
})
export class SummaryModalComponent {
  open = input(false);
  item = input<any | null>(null);
  apiUrl = input('http://localhost:5000/api');
  close = output<void>();
}
