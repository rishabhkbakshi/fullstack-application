import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../services/http-calls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  users: Array<User> = [];

  // variable for loader
  isLoading = false;
  userForm: FormGroup;
  
  addUpdateUserBtn = 'Add';
  idToUpdateUser: any;

  constructor(
    private httpService: HttpCallsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    // form object with some validations
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      gender: ['select'],
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
    if (this.userForm.valid) {
      if (!id) {
        this.isLoading = true;
        this.addUser();
      } else {
        this.isLoading = true;
        this.updateUser(id);
      }
    }
  }

  addUser() {
    this.httpService.addUser(this.userForm.value).then((res: any) => {
      this.isLoading = false;
      this.users = res;
      this.toastr.success('User added successfully', 'Success');
      this.clearForm();
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
      this.userForm.reset();
      this.addUpdateUserBtn = 'Add';
      this.clearForm();
    }).catch(() => {
      this.isLoading = false;
      this.toastr.error('Error in this operation', 'Error')
    }).then(() => {
      this.loadUsers();
    })
  }

  deleteUser(id: string) {
    this.isLoading = true;
    this.httpService.deleteUser(id).then((res: any) => {
      this.isLoading = false;
      this.toastr.success(`<b>User Id - ${id}</b> deleted successfully`, 'Success');
      this.clearForm();
    }).catch(() => {
      this.isLoading = false;
      this.toastr.error('Error in this operation', 'Error')
    }).then(() => {
      this.loadUsers();
    })
  }

  clearForm() {
    this.userForm.reset();
    this.userForm.get('gender')?.setValue('select');
    this.addUpdateUserBtn = 'Add';
  }
}
