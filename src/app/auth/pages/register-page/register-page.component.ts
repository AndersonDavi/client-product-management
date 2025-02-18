import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators as valid,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [valid.required]],
    email: ['', [valid.required, valid.email]],
    password: ['', [valid.required, valid.minLength(6)]],
    password2: ['', [valid.required]],
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')!.value === formGroup.get('password2')!.value
      ? null : { mismatch: true };
  }

  ngOnInit(): void {}

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.myForm.value;
    const role = 'user'; // Default role
    this.authService.register({ name, email, password, role })
      .subscribe({
        next: (response) => {
          if (response === true) {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'Your account has been created successfully!',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/auth/login']);
            });
          }
        },
        error: (err) => {
          Swal.fire('Error', `Registration failed. ${err?.error?.message}`, 'error');
        }
      });
  }
}
