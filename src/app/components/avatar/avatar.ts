import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-avatar',
  imports: [MatIconModule],
  template: `
    <div [class]="avatarClasses()">
      @if (src()) {
        <img [src]="src()" [alt]="alt()" class="ft-avatar__image" />
      } @else if (initials()) {
        <span class="ft-avatar__initials">{{ initials() }}</span>
      } @else {
        <mat-icon class="ft-avatar__icon">person</mat-icon>
      }
    </div>
  `,
  styles: `
    .ft-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--ft-radius-full);
      background: linear-gradient(135deg, var(--ft-primary) 0%, var(--ft-primary-light) 100%);
      color: var(--ft-text-on-primary);
      font-weight: 600;
      overflow: hidden;
      flex-shrink: 0;
    }

    .ft-avatar--xs {
      width: 24px;
      height: 24px;
      font-size: 0.625rem;
    }

    .ft-avatar--sm {
      width: 32px;
      height: 32px;
      font-size: 0.75rem;
    }

    .ft-avatar--md {
      width: 40px;
      height: 40px;
      font-size: 0.875rem;
    }

    .ft-avatar--lg {
      width: 56px;
      height: 56px;
      font-size: 1.125rem;
    }

    .ft-avatar--xl {
      width: 80px;
      height: 80px;
      font-size: 1.5rem;
    }

    .ft-avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ft-avatar__initials {
      text-transform: uppercase;
    }

    .ft-avatar__icon {
      font-size: 60%;
      width: 60%;
      height: 60%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  readonly src = input<string>('');
  readonly alt = input<string>('Avatar');
  readonly initials = input<string>('');
  readonly size = input<AvatarSize>('md');

  readonly avatarClasses = computed(() => {
    return `ft-avatar ft-avatar--${this.size()}`;
  });
}
