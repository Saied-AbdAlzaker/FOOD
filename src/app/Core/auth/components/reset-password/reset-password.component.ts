import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IRegister, IResetPassword } from '../../model/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  userEmail = localStorage.getItem('email');
  isLoading: boolean = false;
  Message: any;
  
  constructor(private _authService: AuthService, private _toastr: ToastrService,
    private _router: Router, private spinner: NgxSpinnerService) { }

  resetForm = new FormGroup({
    email: new FormControl(this.userEmail, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null, Validators.required),
    seed: new FormControl(null, Validators.required)
  }, {
    validators: this.matchPasswords
  })

  matchPasswords(form: any) {
    let password = form.get('password');
    let confirmPassword = form.get('confirmPassword');

    if (password.value == confirmPassword.value) {
      return null
    } else {
      confirmPassword.setErrors({ invalid: 'Password And Confirm Password Not Match' });
      return { invalid: 'Password And Confirm Password Not Match' };
    }
  }

  onSubmitForm(data: FormGroup) {
    this.isLoading = true;

    this._authService.onResetPassword(data.value).subscribe({
      next: (res: IResetPassword) => {
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
        setTimeout(() => {
          this.spinner.hide();
        }, 2500);
      }
    })
  }

}
