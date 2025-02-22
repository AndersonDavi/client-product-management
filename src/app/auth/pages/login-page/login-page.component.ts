import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as valid,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.formBuilder.group({
    email: ['', [valid.required]],
    password: ['', [valid.required]],
  });
  ngOnInit(): void {}

  async login() {
    const { email, password } = this.myForm.value;
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.authService
      .login(email, password)
      .subscribe({
        next: (result) => {
          if (result === true) {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          Swal.fire('Error', 'Login failed. Please try again.', 'error');
        },
      });
  }
}
