import { Component, EventEmitter, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div
      class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-blue-900/40 dark:bg-gray-900"
    >
      <div class="flex items-start justify-between mb-6">
        <div class="flex-1">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
            AI Summary
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Generated just now
          </p>
        </div>
        <div class="flex gap-2">
          <button
            (click)="copy.emit()"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
            Copy
          </button>
          <a
            [href]="openHref()"
            target="_blank"
            class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <svg
              class="w-4 h-4"
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
            Open
          </a>
        </div>
      </div>

      <div class="prose prose-lg max-w-none dark:prose-invert mb-6">
        <div
          [innerHTML]="html()"
          class="text-gray-800 dark:text-gray-200 leading-relaxed"
        ></div>
      </div>

      @if (keywords()?.length) {
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Key Topics
        </h3>
        <div class="flex flex-wrap gap-2">
          @for (k of keywords(); track k) {
          <span
            class="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ k }}
          </span>
          }
        </div>
      </div>
      }

      <div class="space-y-4">
        <div>
          <h3
            class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
          >
            Rephrase Style
          </h3>
          <div class="flex flex-wrap gap-2 justify-start">
            <button
              (click)="rephrase.emit('formal')"
              class="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              📝 Formal
            </button>
            <button
              (click)="rephrase.emit('casual')"
              class="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              😊 Casual
            </button>
            <button
              (click)="rephrase.emit('tweet')"
              class="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              🐦 Tweet
            </button>
            <button
              (click)="rephrase.emit('detailed')"
              class="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              📋 Detailed
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SummaryCardComponent {
  html = input('');
  openHref = input('');
  keywords = input<string[]>([]);
  copy = output<void>();
  rephrase = output<'formal' | 'casual' | 'tweet' | 'detailed'>();
}
