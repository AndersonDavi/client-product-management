import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators as valid } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-detail-page.component.html',
  styleUrl: './user-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailPageComponent implements OnInit {
  user: any;
  private formBuilder = inject(FormBuilder);
  public editForm: FormGroup = this.formBuilder.group({
    name: ['', [valid.required]],
    email: ['', [valid.required]],
    role: ['', [valid.required]],
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUser(userId).subscribe((user) => {
          this.user = user;
          this.editForm.patchValue({
            name: user.name,
            email: user.email,
            role: user.role,
          });
        });
      }
    });
  }

  updateUser() {
    if (this.editForm.valid) {
      this.userService.updateUser(this.user._id, this.editForm.value).subscribe((user) => {
        if (user) {
          Swal.fire('Success', 'User updated successfully!', 'success');
          this.router.navigateByUrl('dashboard/users');
        } else {
          Swal.fire('Error', 'Failed to update user.', 'error');
        }
      });
    }
  }
}
