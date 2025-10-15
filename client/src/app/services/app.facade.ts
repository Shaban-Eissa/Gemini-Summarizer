import { Injectable, signal, inject } from '@angular/core';
import { SummaryService, SummaryRecord } from './summary.service';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  // Public state signals
  text = signal('');
  url = signal('');
  style = signal('short');
  styleOptions = [
    { value: 'short', label: 'Short' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'bullet', label: 'Bullet Points' },
    { value: 'casual', label: 'Casual (friendly tone)' },
  ];
  loading = signal(false);
  loadingText = signal('');
  loadingProgress = signal(0);
  result = signal<any>(null);
  toastMessage = signal<string | null>(null);
  keywords = signal<string[]>([]);
  paletteOpen = signal(false);
  paletteQuery = signal('');
  modalOpen = signal(false);
  modalItem = signal<SummaryRecord | null>(null);

  private readonly summary = inject(SummaryService);

  constructor() {
    // Preload history on app start
    this.summary.getHistory();
  }

  async generate() {
    this.loading.set(true);
    this.loadingText.set('Analyzing content…');
    this.loadingProgress.set(8);
    let progressTimer: any = null;
    try {
      progressTimer = setInterval(() => {
        const current = this.loadingProgress();
        if (current < 90) {
          this.loadingProgress.set(current + 2);
        }
      }, 200);
    } catch {}
    const res: SummaryRecord = await this.summary.summarize({
      text: this.text(),
      url: this.url(),
      style: this.style(),
    });
    this.result.set(res);
    try {
      const summaryText = res?.summary as string | undefined;
      if (summaryText && summaryText.length > 0) {
        const kw = (await this.summary.keywords({
          text: summaryText,
          topN: 5,
        })) as any;
        this.keywords.set(kw?.keywords || []);
      } else {
        this.keywords.set([]);
      }
    } catch {
      this.keywords.set([]);
    }
    this.loadingText.set('Formatting summary…');
    this.loadingProgress.set(100);
    if (progressTimer) clearInterval(progressTimer);
    setTimeout(() => {
      this.loading.set(false);
      this.loadingText.set('');
      this.loadingProgress.set(0);
    }, 250);
  }

  async copySummary() {
    const summaryText = this.result()?.summary || '';
    if (!summaryText) return;
    await navigator.clipboard.writeText(summaryText);
    this.showToast('Summary copied to clipboard');
  }

  openSummaryModal(item: SummaryRecord) {
    this.modalItem.set(item);
    this.modalOpen.set(true);
  }

  closeSummaryModal() {
    this.modalOpen.set(false);
    this.modalItem.set(null);
  }

  renderedSummary() {
    const text = (this.result()?.summary || '').toString();
    return this.basicMarkdownToHtml(text);
  }

  async rephrase(tone: 'formal' | 'casual' | 'tweet' | 'detailed') {
    const base = this.result()?.summary || '';
    if (!base) return;
    this.loading.set(true);
    this.loadingText.set(`Rephrasing (${tone})…`);
    try {
      const out = (await this.summary.rephrase({ text: base, tone })) as any;
      if (out?.rephrased) {
        this.result.set({ ...this.result(), summary: out.rephrased });
        this.showToast('Rephrased');
      }
    } finally {
      this.loading.set(false);
      this.loadingText.set('');
    }
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
        if (this.url()?.trim() || this.text()?.trim()) {
          this.generate();
        } else {
          this.showToast('Please enter a URL or text to summarize');
        }
        break;
      case 'rephrase-formal':
        if (this.result()?.summary) {
          this.rephrase('formal');
        } else {
          this.showToast('Please generate a summary first');
        }
        break;
      case 'rephrase-casual':
        if (this.result()?.summary) {
          this.rephrase('casual');
        } else {
          this.showToast('Please generate a summary first');
        }
        break;
      case 'rephrase-tweet':
        if (this.result()?.summary) {
          this.rephrase('tweet');
        } else {
          this.showToast('Please generate a summary first');
        }
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

  // Helpers
  private showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 1800);
  }

  private escapeHtml(input: string) {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private basicMarkdownToHtml(input: string) {
    const escaped = this.escapeHtml(input);
    const lines = escaped.split(/\r?\n/);
    const blocks: string[] = [];
    let listOpen = false;
    for (const line of lines) {
      const bulletMatch = line.match(/^\s*[-*+]\s+(.*)/);
      const numberMatch = line.match(/^\s*\d+\.\s+(.*)/);
      if (bulletMatch || numberMatch) {
        if (!listOpen) {
          blocks.push('<ul class="list-disc pl-5 space-y-1">');
          listOpen = true;
        }
        blocks.push(
          `<li>${bulletMatch ? bulletMatch[1] : numberMatch![1]}</li>`
        );
      } else {
        if (listOpen) {
          blocks.push('</ul>');
          listOpen = false;
        }
        if (line.trim().length === 0) {
          blocks.push('<br/>');
        } else {
          let html = line
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(
              /`([^`]+)`/g,
              '<code class="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">$1</code>'
            );
          blocks.push(`<p>${html}</p>`);
        }
      }
    }
    if (listOpen) blocks.push('</ul>');
    return blocks.join('\n');
  }
}
