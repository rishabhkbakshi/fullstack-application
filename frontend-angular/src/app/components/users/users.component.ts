import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpCallsService } from '../../services/http-calls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserConfirmationPopupComponent } from '../delete-user-confirmation-popup/delete-user-confirmation-popup.component';
import User from '../../interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('userFormRef', { static: true }) userFormRef: any;

  users: Array<User> = [];
  isLoading = false;
  userForm: FormGroup;

  addUpdateUserBtn = 'Add';
  idToUpdateUser: string | null = null;

  constructor(
    private httpService: HttpCallsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['select', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.httpService.getUsers().then((res: User[]) => {
      this.users = res;
    }).catch((err) => {
      console.error('Error loading users:', err);
      this.toastr.error('Failed to load users', 'Error');
    }).finally(() => {
      this.isLoading = false;
    });
  }

  action(id: string, user?: User) {
    if (user != undefined) {
      this.addUpdateUserBtn = 'Update';
      this.idToUpdateUser = id;
      this.userForm.patchValue(user);
    } else {
      this.deleteUser(id);
    }
  }

  addUpdateUserAction() {
    if (this.userForm.get('gender')?.value === 'select') {
      this.userForm.get('gender')?.setErrors({
        required: true,
      });
    }

    if (this.userForm.valid) {
      this.isLoading = true;
      if (!this.idToUpdateUser) {
        this.addUser();
      } else {
        this.updateUser(this.idToUpdateUser);
      }
    } else {
      this.toastr.error('Please fill all required fields correctly.', 'Validation Error');
      this.userForm.markAllAsTouched();
    }
  }

  addUser() {
    this.httpService.addUser(this.userForm.value).then(() => {
      this.users.push({
        id: this.users[this.users.length - 1].id + 1,
        ...this.userForm.value
      }); // Add new user to the list
      this.toastr.success('User added successfully', 'Success');
      this.clearForm();
    }).catch(() => {
      this.toastr.error('Error adding user', 'Error');
    }).finally(() => {
      this.isLoading = false;
    });
  }

  updateUser(id: string) {
    this.httpService.updateUser(id, this.userForm.value).then(() => {
      this.toastr.success(`<b>User Id - ${id}</b> updated successfully`, 'Success');
      this.addUpdateUserBtn = 'Add';

      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) {
        this.users[index] = { id, ...this.userForm.value };
      } // Update the user in the list
      
      this.clearForm();
    }).catch(() => {
      this.toastr.error('Error updating user', 'Error');
    }).finally(() => {
      this.isLoading = false;
    });
  }

  deleteUser(id: string) {
    let dialogRef = this.dialog.open(DeleteUserConfirmationPopupComponent, {
      width: '250px',
      disableClose: true,
      data: { id }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.actionCalled === 'Ok') {
        this.users = this.users.filter(user => user.id !== id); // Remove user from the list
      }
      this.clearForm();
    });
  }

  clearForm() {
    this.userFormRef.resetForm();
    this.userForm.reset();
    this.addUpdateUserBtn = 'Add';
    this.idToUpdateUser = null;
    this.userForm.get('gender')?.setValue('select');
  }
}