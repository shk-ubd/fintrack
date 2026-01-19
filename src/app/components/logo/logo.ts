import { Component, input, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <a class="ft-logo" routerLink="/">
      <div class="ft-logo__icon">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="#005461"/>
              <stop offset="1" stop-color="#018790"/>
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#logo-gradient)"/>
          <path d="M12 28V14h10v3h-6v3h5v3h-5v5h-4z" fill="white"/>
          <path d="M24 28V17h4v11h-4zM24 15v-3h4v3h-4z" fill="white" opacity="0.8"/>
        </svg>
      </div>
      @if (!collapsed()) {
        <div class="ft-logo__text">
          <span class="ft-logo__name">FinTrack</span>
          <span class="ft-logo__tagline">Finance Manager</span>
        </div>
      }
    </a>
  `,
  styles: `
    .ft-logo {
      display: flex;
      align-items: center;
      gap: var(--ft-spacing-sm);
      text-decoration: none;
    }

    .ft-logo__icon {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }

    .ft-logo__icon svg {
      width: 100%;
      height: 100%;
    }

    .ft-logo__text {
      display: flex;
      flex-direction: column;
    }

    .ft-logo__name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--ft-primary);
      line-height: 1.2;
    }

    .ft-logo__tagline {
      font-size: 0.625rem;
      color: var(--ft-text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly collapsed = input<boolean>(false);
}
