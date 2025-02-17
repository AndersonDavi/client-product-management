import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as valid,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.css'],
})
export class UsersListPageComponent implements OnInit {
  users: any[] = [];
  private formBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [valid.required]],
    email: ['', [valid.required]],
    password: ['', [valid.required]],
    role: ['', [valid.required]],
  });
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  createUser() {
    if (this.myForm.valid) {
      this.userService.createUser(this.myForm.value).subscribe((user) => {
        if (user) {
          this.loadUsers();
          this.myForm.reset();
          Swal.fire('Success', 'User created successfully!', 'success');
        } else {
          Swal.fire('Error', 'Failed to create user.', 'error');
        }
      });
    }
  }
  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id, false).subscribe((user) => {
          if (user) {
            this.loadUsers();
            Swal.fire('Deleted!', 'User deleted successfully!', 'success');
          } else {
            Swal.fire('Error', 'Failed to delete user.', 'error');
          }
        });
      }
    });
  }
  goToUpdateUser(id: string) {
    this.router.navigateByUrl(`dashboard/user/${id}`);
  }
}
