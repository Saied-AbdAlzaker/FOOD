import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { IChangePassword } from '../../model/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  hideOld: boolean = true;
  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  isLoading: boolean = false;
  Message: any;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private _router: Router, private _authService: AuthService,
    private _toastr:ToastrService, private spinner: NgxSpinnerService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeForm = new FormGroup({
    oldPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmNewPassword: new FormControl(null, [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')])
  }, {
    validators: this.matchPasswords
  })

  matchPasswords(form: any) {
    let password = form.get('newPassword');
    let confirmPassword = form.get('confirmNewPassword');

    if (password.value == confirmPassword.value) {
      return null
    } else {
      confirmPassword.setErrors({ invalid: 'Password And Confirm Password Not Match' });
      return { invalid: 'Password And Confirm Password Not Match' };
    }
  }

  onSubmitForm(data: FormGroup) {
    this.isLoading = true;

    this._authService.onChangePassword(data.value).subscribe({
      next: (res: IChangePassword) => {
        console.log(res);
        this.Message = res;
      }, error: (err: any) => {
        this.isLoading = false;
        this._toastr.error(err.error.message, 'Error!')
      }, complete: () => {
        this.isLoading = false;
        this.spinner.show();
        this._toastr.success(this.Message.message, 'Successfully!');
        this._router.navigate(['/auth/login']);
        this.onNoClick();
        setTimeout(() => {
          this.spinner.hide();
        }, 2500);
      }
    })
  }


}
