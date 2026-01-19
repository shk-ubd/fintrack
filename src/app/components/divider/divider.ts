import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-divider',
  imports: [],
  template: `
    <div [class]="dividerClasses()">
      @if (text()) {
        <span class="ft-divider__text">{{ text() }}</span>
      }
    </div>
  `,
  styles: `
    .ft-divider {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .ft-divider--horizontal {
      height: 1px;
      background-color: rgba(0, 0, 0, 0.08);
    }

    .ft-divider--vertical {
      width: 1px;
      height: 100%;
      min-height: 20px;
      background-color: rgba(0, 0, 0, 0.08);
    }

    .ft-divider--with-text {
      background: none;
    }

    .ft-divider--with-text::before,
    .ft-divider--with-text::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.08);
    }

    .ft-divider__text {
      padding: 0 var(--ft-spacing-md);
      font-size: 0.75rem;
      color: var(--ft-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .ft-divider--spacing-sm {
      margin: var(--ft-spacing-sm) 0;
    }

    .ft-divider--spacing-md {
      margin: var(--ft-spacing-md) 0;
    }

    .ft-divider--spacing-lg {
      margin: var(--ft-spacing-lg) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Divider {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly text = input<string>('');
  readonly spacing = input<'sm' | 'md' | 'lg'>('md');

  readonly dividerClasses = computed(() => {
    const classes = ['ft-divider', `ft-divider--${this.orientation()}`, `ft-divider--spacing-${this.spacing()}`];
    
    if (this.text()) {
      classes.push('ft-divider--with-text');
    }
    
    return classes.join(' ');
  });
}
