import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  template: `
    <footer class="mx-auto mt-10 max-w-4xl text-center text-xs text-gray-500">
      <p>Made with Angular and Tailwind. Focus on what matters.</p>
    </footer>
  `,
})
export class FooterBarComponent {}
