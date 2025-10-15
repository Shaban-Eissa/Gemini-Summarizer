import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InputFacade {
  text = signal('');
  url = signal('');
  style = signal('short');
  styleOptions = [
    { value: 'short', label: 'Short' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'bullet', label: 'Bullet Points' },
    { value: 'casual', label: 'Casual (friendly tone)' },
  ];
}
