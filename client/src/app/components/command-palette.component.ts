import { Component, EventEmitter, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (open()) {
    <div
      class="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-6 backdrop-blur-sm"
      (click)="close.emit()"
    >
      <div
        class="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-900 dark:border dark:border-gray-800"
        (click)="$event.stopPropagation()"
      >
        <input
          [(ngModel)]="queryValue"
          placeholder="Type a command… (e.g., summarize, rephrase)"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
        />
        <div class="mt-3 divide-y divide-gray-100 dark:divide-gray-700">
          <button
            class="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
            (click)="action.emit('summarize')"
          >
            Summarize
          </button>
          <button
            class="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
            (click)="action.emit('rephrase-formal')"
          >
            Rephrase: Formal
          </button>
          <button
            class="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
            (click)="action.emit('rephrase-casual')"
          >
            Rephrase: Casual
          </button>
          <button
            class="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
            (click)="action.emit('rephrase-tweet')"
          >
            Rephrase: Tweet
          </button>
          <button
            class="w-full text-left px-2 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
            (click)="action.emit('history')"
          >
            Go to History
          </button>
        </div>
      </div>
    </div>
    }
  `,
})
export class CommandPaletteComponent {
  open = input(false);
  query = input('');
  action = output<string>();
  close = output<void>();

  queryValue = '';

  constructor() {
    this.queryValue = this.query();
  }
}
