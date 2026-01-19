import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButton {
  // Inputs
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly icon = input<string>('');
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  // Outputs
  readonly clicked = output<MouseEvent>();

  // Computed classes
  readonly buttonClasses = computed(() => {
    const classes = ['ft-button', `ft-button--${this.variant()}`, `ft-button--${this.size()}`];
    
    if (this.fullWidth()) {
      classes.push('ft-button--full-width');
    }
    
    if (this.loading()) {
      classes.push('ft-button--loading');
    }

    if (this.icon() && !this.hasContent()) {
      classes.push('ft-button--icon-only');
    }

    return classes.join(' ');
  });

  readonly isDisabled = computed(() => this.disabled() || this.loading());

  readonly spinnerDiameter = computed(() => {
    const sizeMap = { sm: 16, md: 20, lg: 24 };
    return sizeMap[this.size()];
  });

  private hasContent(): boolean {
    return true; // Will be determined by content projection
  }

  onClick(event: MouseEvent): void {
    if (!this.isDisabled()) {
      this.clicked.emit(event);
    }
  }
}
