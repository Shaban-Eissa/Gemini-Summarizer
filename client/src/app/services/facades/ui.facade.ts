import { Injectable, signal, inject } from '@angular/core';
import { SummaryRecord } from '../summary.service';
import { GenerationFacade } from './generation.facade';
import { InputFacade } from './input.facade';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  toastMessage = signal<string | null>(null);
  paletteOpen = signal(false);
  paletteQuery = signal('');
  modalOpen = signal(false);
  modalItem = signal<SummaryRecord | null>(null);

  private readonly generation = inject(GenerationFacade);
  private readonly input = inject(InputFacade);

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 1800);
  }

  copySummary = async () => {
    const summaryText = this.generation.result()?.summary || '';
    if (!summaryText) return;
    await navigator.clipboard.writeText(summaryText);
    this.showToast('Summary copied to clipboard');
  };

  openSummaryModal(item: SummaryRecord) {
    this.modalItem.set(item);
    this.modalOpen.set(true);
  }
  closeSummaryModal() {
    this.modalOpen.set(false);
    this.modalItem.set(null);
  }

  openPalette() {
    this.paletteOpen.set(true);
    this.paletteQuery.set('');
  }
  closePalette() {
    this.paletteOpen.set(false);
  }

  selectPaletteAction(action: string) {
    switch (action) {
      case 'summarize':
        if (this.input.url()?.trim() || this.input.text()?.trim()) {
          this.generation.generate();
        } else {
          this.showToast('Please enter a URL or text to summarize');
        }
        break;
      case 'rephrase-formal':
        if (this.generation.result()?.summary)
          this.generation.rephrase('formal');
        else this.showToast('Please generate a summary first');
        break;
      case 'rephrase-casual':
        if (this.generation.result()?.summary)
          this.generation.rephrase('casual');
        else this.showToast('Please generate a summary first');
        break;
      case 'rephrase-tweet':
        if (this.generation.result()?.summary)
          this.generation.rephrase('tweet');
        else this.showToast('Please generate a summary first');
        break;
      case 'history':
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
        break;
    }
    this.closePalette();
  }
}
