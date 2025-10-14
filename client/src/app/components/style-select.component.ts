import { Component, EventEmitter, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-style-select',
  standalone: true,
  imports: [],
  template: `
    <div class="relative">
      <button
        type="button"
        (click)="toggle()"
        class="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm outline-none ring-blue-500 transition hover:bg-gray-50 focus:ring-2"
      >
        <span>{{ currentLabel() }}</span>
        <svg
          class="h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      @if (open()) {
      <div
        class="absolute z-20 mt-1 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-1 shadow-xl"
      >
        @for (opt of options(); track opt.value) {
        <button
          (click)="choose(opt.value)"
          class="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-50"
          [class.bg-blue-50]="value() === opt.value"
          [class.text-blue-700]="value() === opt.value"
        >
          {{ opt.label }}
        </button>
        }
      </div>
      }
    </div>
  `,
})
export class StyleSelectComponent {
  value = input<string>('');
  options = input<{ value: string; label: string }[]>([]);
  valueChange = output<string>();

  open = signal(false);

  toggle() {
    this.open.set(!this.open());
  }
  choose(v: string) {
    this.valueChange.emit(v);
    this.open.set(false);
  }

  currentLabel() {
    const found = this.options().find((o) => o.value === this.value());
    return found ? found.label : this.value();
  }
}
