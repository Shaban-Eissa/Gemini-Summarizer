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
import { InputFacade } from './services/facades/input.facade';
import { GenerationFacade } from './services/facades/generation.facade';
import { UiFacade } from './services/facades/ui.facade';
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
  private readonly input = inject(InputFacade);
  private readonly generation = inject(GenerationFacade);
  private readonly ui = inject(UiFacade);
  summary = inject(SummaryService);

  text = this.input.text;
  url = this.input.url;
  style = this.input.style;
  styleOptions = this.input.styleOptions;
  loading = this.generation.loading;
  loadingText = this.generation.loadingText;
  loadingProgress = this.generation.loadingProgress;
  result = this.generation.result;
  toastMessage = this.ui.toastMessage;
  keywords = this.generation.keywords;
  paletteOpen = this.ui.paletteOpen;
  paletteQuery = this.ui.paletteQuery;
  modalOpen = this.ui.modalOpen;
  modalItem = this.ui.modalItem;

  constructor() {
    this.summary.getHistory();
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
    return this.generation.generate();
  }

  async copySummary() {
    return this.ui.copySummary();
  }

  openSummaryModal(item: SummaryRecord) {
    this.ui.openSummaryModal(item);
  }

  closeSummaryModal() {
    this.ui.closeSummaryModal();
  }

  renderedSummary() {
    return this.generation.renderedSummary();
  }

  openPalette() {
    this.ui.openPalette();
  }
  closePalette() {
    this.ui.closePalette();
  }
  selectPaletteAction(action: string) {
    this.ui.selectPaletteAction(action);
  }

  async rephrase(tone: 'formal' | 'casual' | 'tweet' | 'detailed') {
    return this.generation.rephrase(tone);
  }
}
