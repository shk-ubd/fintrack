import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomButton } from '../../components/custom-button/custom-button';
import { Input } from '../../components/input/input';
import { Divider } from '../../components/divider/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CustomButton,
    Input,
    Divider,
    MatIconModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signup {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly loading = signal<boolean>(false);
  readonly acceptTerms = signal<boolean>(false);

  readonly signupForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: this.passwordMatchValidator });

  get firstNameError(): string {
    const control = this.signupForm.get('firstName');
    if (control?.hasError('required') && control.touched) {
      return 'First name is required';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'First name must be at least 2 characters';
    }
    return '';
  }

  get lastNameError(): string {
    const control = this.signupForm.get('lastName');
    if (control?.hasError('required') && control.touched) {
      return 'Last name is required';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Last name must be at least 2 characters';
    }
    return '';
  }

  get emailError(): string {
    const control = this.signupForm.get('email');
    if (control?.hasError('required') && control.touched) {
      return 'Email is required';
    }
    if (control?.hasError('email') && control.touched) {
      return 'Please enter a valid email';
    }
    return '';
  }

  get passwordError(): string {
    const control = this.signupForm.get('password');
    if (control?.hasError('required') && control.touched) {
      return 'Password is required';
    }
    if (control?.hasError('minlength') && control.touched) {
      return 'Password must be at least 8 characters';
    }
    if (control?.hasError('passwordStrength') && control.touched) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    return '';
  }

  get confirmPasswordError(): string {
    const control = this.signupForm.get('confirmPassword');
    if (control?.hasError('required') && control.touched) {
      return 'Please confirm your password';
    }
    if (this.signupForm.hasError('passwordMismatch') && control?.touched) {
      return 'Passwords do not match';
    }
    return '';
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return passwordValid ? null : { passwordStrength: true };
  }

  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  toggleTerms(): void {
    this.acceptTerms.update(value => !value);
  }

  onSubmit(): void {
    if (this.signupForm.valid && this.acceptTerms()) {
      this.loading.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.loading.set(false);
        this.router.navigate(['/auth/login']);
      }, 1500);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  onGoogleSignup(): void {
    console.log('Google signup clicked');
  }

  onMicrosoftSignup(): void {
    console.log('Microsoft signup clicked');
  }
}
