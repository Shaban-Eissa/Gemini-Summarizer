import { Component, inject } from '@angular/core';
import { RecentListComponent } from './components/recent-list.component';
import { SummaryModalComponent } from './components/summary-modal.component';
import { ToastComponent } from './components/toast.component';
import { CommandPaletteComponent } from './components/command-palette.component';
import { FormCardComponent } from './components/form-card.component';
import { SummaryCardComponent } from './components/summary-card.component';
import { HeaderBarComponent } from './components/header-bar.component';
import { FooterBarComponent } from './components/footer-bar.component';
import { SummaryService, SummaryRecord } from './services/summary.service';
import { AppFacade } from './services/app.facade';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    RecentListComponent,
    SummaryModalComponent,
    ToastComponent,
    CommandPaletteComponent,
    FormCardComponent,
    SummaryCardComponent,
    HeaderBarComponent,
    FooterBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly facade = inject(AppFacade);
  summary = inject(SummaryService); // kept to preserve template usage of summary.summaries()

  // Expose facade signals to preserve current template API (signal-as-function usage)
  text = this.facade.text;
  url = this.facade.url;
  style = this.facade.style;
  styleOptions = this.facade.styleOptions;
  loading = this.facade.loading;
  loadingText = this.facade.loadingText;
  loadingProgress = this.facade.loadingProgress;
  result = this.facade.result;
  toastMessage = this.facade.toastMessage;
  keywords = this.facade.keywords;
  paletteOpen = this.facade.paletteOpen;
  paletteQuery = this.facade.paletteQuery;
  modalOpen = this.facade.modalOpen;
  modalItem = this.facade.modalItem;

  constructor() {
    // history is preloaded by facade's constructor; keep hotkey here
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (this.paletteOpen()) this.closePalette();
        else this.openPalette();
      }
    });
  }

  async generate() {
    return this.facade.generate();
  }

  async copySummary() {
    return this.facade.copySummary();
  }

  openSummaryModal(item: SummaryRecord) {
    this.facade.openSummaryModal(item);
  }

  closeSummaryModal() {
    this.facade.closeSummaryModal();
  }

  renderedSummary() {
    return this.facade.renderedSummary();
  }

  openPalette() {
    this.facade.openPalette();
  }
  closePalette() {
    this.facade.closePalette();
  }
  selectPaletteAction(action: string) {
    this.facade.selectPaletteAction(action);
  }

  async rephrase(tone: 'formal' | 'casual' | 'tweet' | 'detailed') {
    return this.facade.rephrase(tone);
  }
}
