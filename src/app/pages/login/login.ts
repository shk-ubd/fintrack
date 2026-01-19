import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomButton } from '../../components/custom-button/custom-button';
import { Input } from '../../components/input/input';
import { Divider } from '../../components/divider/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CustomButton,
    Input,
    Divider,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly loading = signal<boolean>(false);
  readonly showPassword = signal<boolean>(false);
  readonly rememberMe = signal<boolean>(false);

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get emailError(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required') && control.touched) {
      return 'Email is required';
    }
    if (control?.hasError('email') && control.touched) {
      return 'Please enter a valid email';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required') && control.touched) {
      return 'Password is required';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }

  toggleRememberMe(): void {
    this.rememberMe.update(value => !value);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onGoogleLogin(): void {
    console.log('Google login clicked');
  }

  onMicrosoftLogin(): void {
    console.log('Microsoft login clicked');
  }
}
