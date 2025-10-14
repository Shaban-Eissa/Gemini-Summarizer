import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SummaryRecord {
  id: string;
  text: string;
  summary: string;
  url?: string;
  style: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class SummaryService {
  http = inject(HttpClient)
  summaries = signal<any[]>([]);
  apiUrl = 'http://localhost:5000/api';

  async summarize(data: { text?: string; url?: string; style: string }): Promise<SummaryRecord> {
    const summary = await this.http.post<SummaryRecord>(`${this.apiUrl}/summarize`, data).toPromise();
    this.summaries.update((prev) => [summary, ...prev]);
    return summary as SummaryRecord;
  }

  getHistory() {
    this.http.get<SummaryRecord[]>(`${this.apiUrl}/history`).subscribe((data) => {
      this.summaries.set(data as any);
    });
  }

  getSummaryById(id: string) {
    return this.http.get<SummaryRecord>(`${this.apiUrl}/summary/${id}`);
  }

  async rephrase(data: { text: string; tone: 'formal' | 'casual' | 'tweet' | 'detailed' }) {
    return await this.http.post(`${this.apiUrl}/rephrase`, data).toPromise();
  }

  async keywords(data: { text: string; topN?: number }) {
    return await this.http.post(`${this.apiUrl}/keywords`, data).toPromise();
  }
}
