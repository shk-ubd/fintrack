import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  imports: [],
  template: `
    <span [class]="badgeClasses()">
      <ng-content></ng-content>
    </span>
  `,
  styles: `
    .ft-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border-radius: var(--ft-radius-full);
      white-space: nowrap;
    }

    .ft-badge--sm {
      padding: 2px 8px;
      font-size: 0.688rem;
    }

    .ft-badge--md {
      padding: 4px 12px;
      font-size: 0.75rem;
    }

    .ft-badge--primary {
      background-color: rgba(0, 84, 97, 0.1);
      color: var(--ft-primary);
    }

    .ft-badge--secondary {
      background-color: rgba(1, 135, 144, 0.1);
      color: var(--ft-primary-light);
    }

    .ft-badge--success {
      background-color: rgba(34, 197, 94, 0.1);
      color: var(--ft-success);
    }

    .ft-badge--warning {
      background-color: rgba(245, 158, 11, 0.1);
      color: var(--ft-warning);
    }

    .ft-badge--error {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--ft-error);
    }

    .ft-badge--info {
      background-color: rgba(59, 130, 246, 0.1);
      color: var(--ft-info);
    }

    .ft-badge--dot::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 6px;
      background-color: currentColor;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  readonly variant = input<BadgeVariant>('primary');
  readonly size = input<BadgeSize>('md');
  readonly dot = input<boolean>(false);

  readonly badgeClasses = computed(() => {
    const classes = ['ft-badge', `ft-badge--${this.variant()}`, `ft-badge--${this.size()}`];
    
    if (this.dot()) {
      classes.push('ft-badge--dot');
    }
    
    return classes.join(' ');
  });
}
