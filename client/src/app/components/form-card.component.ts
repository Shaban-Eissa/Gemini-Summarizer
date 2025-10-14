import { Component, EventEmitter, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {} from '@angular/common';
import { StyleSelectComponent } from './style-select.component';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [FormsModule, StyleSelectComponent],
  template: `
    <div
      class="rounded-2xl border border-gray-200 bg-white p-3 sm:p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div class="grid gap-3">
        <div>
          <label
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Article URL (optional)</label
          >
          <input
            [ngModel]="url()"
            (ngModelChange)="urlChange.emit($event)"
            placeholder="https://example.com/article"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            If provided, the article text will be fetched automatically.
          </p>
        </div>

        <div>
          <label
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Or paste text</label
          >
          <textarea
            [ngModel]="text()"
            (ngModelChange)="textChange.emit($event)"
            rows="9"
            placeholder="Paste your text here..."
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          ></textarea>
          <div class="mt-1 flex items-center justify-between">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Tip: You can paste a few thousand characters.
            </p>
            <span class="text-xs text-gray-400 dark:text-gray-500"
              >{{ (text() || '').length }} chars</span
            >
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 items-end gap-4 lg:grid-cols-3"
        >
          <div class="sm:col-span-1 lg:col-span-2">
            <label
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Style</label
            >
            <app-style-select
              [value]="style()"
              [options]="styleOptions()"
              (valueChange)="styleChange.emit($event)"
            ></app-style-select>
          </div>

          <button
            (click)="generate.emit()"
            [disabled]="loading() || (!url()?.trim() && !text()?.trim())"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            @if (loading()) {
            <svg
              class="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            }
            {{ loading() ? 'Summarizing…' : 'Generate' }}
          </button>
        </div>

        @if (loading()) {
        <div class="mt-3">
          <div
            class="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700"
          >
            <div
              class="h-full bg-blue-600 transition-all"
              [style.width.%]="loadingProgress()"
            ></div>
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ loadingText() }}
          </p>
        </div>
        }
      </div>
    </div>
  `,
})
export class FormCardComponent {
  url = input('');
  urlChange = output<string>();
  text = input('');
  textChange = output<string>();
  style = input('short');
  styleChange = output<string>();
  styleOptions = input<{ value: string; label: string }[]>([]);
  loading = input(false);
  loadingText = input('');
  loadingProgress = input(0);
  generate = output<void>();
}
