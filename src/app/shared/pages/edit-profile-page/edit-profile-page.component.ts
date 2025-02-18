import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators as valid } from '@angular/forms';
import { UserService } from '../../../dashboard/services/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile-page.component.html',
  styleUrl: './edit-profile-page.component.css',
})
export class EditProfilePageComponent implements OnInit {
  user: any;
  isAdmin: boolean = false;
  private formBuilder = inject(FormBuilder);
  public editForm: FormGroup = this.formBuilder.group({
    _id: [''],
    name: ['', [valid.required]],
    email: ['', [valid.required]],
    role: ['', [valid.required]],
  });

  constructor(private userService: UserService) {}

  async ngOnInit() {
    const currentUserId = localStorage.getItem('user');
    if (currentUserId) {
      this.userService.getUser(currentUserId).subscribe((user) => {
        this.user = user;
        this.isAdmin = user.role === 'admin';
        this.editForm.patchValue({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      });
    }
  }

  updateUser() {
    if (this.editForm.valid) {
      this.userService.updateOwnProfile(this.editForm.value).subscribe((user) => {
        if (user) {
          Swal.fire('Success', 'Profile updated successfully!', 'success');
        } else {
          Swal.fire('Error', 'Failed to update profile.', 'error');
        }
      });
    }
  }
}
