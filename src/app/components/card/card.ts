import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly variant = input<CardVariant>('default');
  readonly padding = input<CardPadding>('md');
  readonly hoverable = input<boolean>(false);
  readonly clickable = input<boolean>(false);

  readonly cardClasses = computed(() => {
    const classes = ['ft-card', `ft-card--${this.variant()}`, `ft-card--padding-${this.padding()}`];
    
    if (this.hoverable()) {
      classes.push('ft-card--hoverable');
    }
    
    if (this.clickable()) {
      classes.push('ft-card--clickable');
    }
    
    return classes.join(' ');
  });
}
