import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpCallsService } from '../../services/http-calls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserConfirmationPopupComponent } from '../delete-user-confirmation-popup/delete-user-confirmation-popup.component';

interface User {
  id: string,
  firstName: string,
  lastName: string,
  gender: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('userFormRef', { static: true }) userFormRef: any;

  users: Array<User> = [];

  // variable for loader
  isLoading = false;
  userForm: FormGroup;

  addUpdateUserBtn = 'Add';
  idToUpdateUser: any;

  constructor(
    private httpService: HttpCallsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    // form object with some validations
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
    this.httpService.getUsers().then((res: any) => {
      this.isLoading = false;
      this.users = res;
    }, (err) => {
      this.isLoading = false;
      console.log(err)
    })
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

  addUpdateUserAction(id?: string) {
    if (this.userForm.get('gender')?.value === 'select') {
      this.userForm.get('gender')?.setErrors({
        required: true,
      })
    }
    if (this.userForm.valid) {
      if (!id) {
        this.isLoading = true;
        this.addUser();
      } else {
        this.isLoading = true;
        this.updateUser(id);
      }
      this.clearForm();
    }
  }

  addUser() {
    this.httpService.addUser(this.userForm.value).then((res: any) => {
      this.isLoading = false;
      this.users = res;
      this.toastr.success('User added successfully', 'Success');
    }).catch(() => {
      this.isLoading = false;
      this.toastr.error('Error in this operation', 'Error');
    }).then(() => {
      this.loadUsers();
    })
  }

  updateUser(id: string) {
    this.httpService.updateUser(id, this.userForm.value).then((res) => {
      this.isLoading = false;
      this.toastr.success(`<b>User Id - ${id}</b> updated successfully`, 'Success');
      this.addUpdateUserBtn = 'Add';
    }).catch(() => {
      this.isLoading = false;
      this.toastr.error('Error in this operation', 'Error')
    }).then(() => {
      this.loadUsers();
    })
  }

  deleteUser(id: string) {
    let dialogRef = this.dialog.open(DeleteUserConfirmationPopupComponent, {
      width: '250px',
      disableClose: true,
      data: { id }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.actionCalled === 'Ok') {
        this.loadUsers();
      }
      this.clearForm();
    })
  }

  clearForm() {
    this.userFormRef.resetForm();
    this.userForm.reset();
    this.addUpdateUserBtn = 'Add';
    this.userForm.get('gender')?.setValue('select')
  }
}
