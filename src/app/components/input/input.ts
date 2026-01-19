import { Component, input, output, computed, signal, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  // Inputs
  readonly type = input<InputType>('text');
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly hint = input<string>('');
  readonly errorMessage = input<string>('');
  readonly size = input<InputSize>('md');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly prefixIcon = input<string>('');
  readonly suffixIcon = input<string>('');
  readonly autocomplete = input<string>('off');

  // Internal state
  readonly value = signal<string>('');
  readonly showPassword = signal<boolean>(false);
  readonly isFocused = signal<boolean>(false);

  // Outputs
  readonly valueChange = output<string>();
  readonly focus = output<FocusEvent>();
  readonly blur = output<FocusEvent>();

  // Computed
  readonly inputClasses = computed(() => {
    const classes = ['ft-input', `ft-input--${this.size()}`];
    
    if (this.isFocused()) {
      classes.push('ft-input--focused');
    }
    
    if (this.errorMessage()) {
      classes.push('ft-input--error');
    }
    
    if (this.disabled()) {
      classes.push('ft-input--disabled');
    }
    
    return classes.join(' ');
  });

  readonly actualType = computed(() => {
    if (this.type() === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type();
  });

  // ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled by input signal
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
    this.valueChange.emit(target.value);
  }

  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.focus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    this.blur.emit(event);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }
}
