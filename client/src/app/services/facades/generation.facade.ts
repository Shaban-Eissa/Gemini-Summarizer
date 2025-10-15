import { Injectable, signal, inject } from '@angular/core';
import { SummaryService, SummaryRecord } from '../summary.service';
import { InputFacade } from './input.facade';

@Injectable({ providedIn: 'root' })
export class GenerationFacade {
  loading = signal(false);
  loadingText = signal('');
  loadingProgress = signal(0);
  result = signal<any>(null);
  keywords = signal<string[]>([]);

  private readonly summary = inject(SummaryService);
  private readonly input = inject(InputFacade);

  async generate() {
    this.loading.set(true);
    this.loadingText.set('Analyzing content…');
    this.loadingProgress.set(8);
    let progressTimer: any = null;
    try {
      progressTimer = setInterval(() => {
        const current = this.loadingProgress();
        if (current < 90) this.loadingProgress.set(current + 2);
      }, 200);
    } catch {}
    const res: SummaryRecord = await this.summary.summarize({
      text: this.input.text(),
      url: this.input.url(),
      style: this.input.style(),
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
      if (out?.rephrased)
        this.result.set({ ...this.result(), summary: out.rephrased });
    } finally {
      this.loading.set(false);
      this.loadingText.set('');
    }
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
