import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpCallsService } from '../../services/http-calls.service';

@Component({
  selector: 'app-delete-user-confirmation-popup',
  templateUrl: './delete-user-confirmation-popup.component.html',
  styleUrls: ['./delete-user-confirmation-popup.component.scss']
})
export class DeleteUserConfirmationPopupComponent implements OnInit {

  message: string = 'Are you sure, you want to delete this user ?';
  confirmButtonText: string = 'Yes';
  cancelButtonText: string = 'Cancel';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteUserConfirmationPopupComponent>,
    private httpService: HttpCallsService,
    private toastr: ToastrService
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit(): void {
  }

  onConfirmClick() {
    const userId: number = this.data.id;
    this.httpService.deleteUser(userId).then((res: any) => {
      this.closeModal({
        actionCalled: 'Ok'
      });
      this.toastr.success(`<b>User Id - ${userId}</b> deleted successfully`, 'Success');
    }).catch(() => {
      this.closeModal({
        actionCalled: 'Cancel'
      });
      this.toastr.error('Error in this operation', 'Error')
    })
  }

  closeModal(data: any) {
    this.dialogRef.close(data);
  }

}
