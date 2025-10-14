import { Component, EventEmitter, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recent-list',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="space-y-3">
      @if (items().length === 0) {
      <div class="text-center py-8">
        <div
          class="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-800"
        >
          <svg
            class="w-6 h-6 text-gray-400"
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
        <p class="text-sm text-gray-500 dark:text-gray-400">No summaries yet</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Generate your first summary to see it here
        </p>
      </div>
      } @else { @for (s of items(); track s.id) {
      <div
        class="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/30"
            >
              <svg
                class="w-4 h-4 text-blue-600 dark:text-blue-400"
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
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-medium text-gray-500 dark:text-gray-400"
                >{{ s.style }}</span
              >
              <span class="text-xs text-gray-400 dark:text-gray-500">{{
                s.createdAt | date : 'short'
              }}</span>
              <span class="text-xs text-gray-400 dark:text-gray-500"
                >ID: {{ s.id.slice(0, 8) }}...</span
              >
            </div>
          </div>
        </div>

        <div class="mb-4">
          <button
            (click)="open.emit(s)"
            class="text-left text-sm text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-3 leading-relaxed"
          >
            {{ s.summary }}
          </button>
        </div>

        @if (s.url) {
        <div class="mb-4">
          <div
            class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
          >
            <span class="truncate">{{ s.url }}</span>
          </div>
        </div>
        }

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button
              (click)="open.emit(s)"
              class="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              View
            </button>
          </div>
          <a
            [href]="apiUrl() + '/summary/' + s.id"
            target="_blank"
            class="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg
              class="w-3 h-3"
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
            Open API
          </a>
        </div>
      </div>
      } }
    </div>
  `,
})
export class RecentListComponent {
  items = input<any[]>([]);
  apiUrl = input('http://localhost:5000/api');
  open = output<any>();
}
