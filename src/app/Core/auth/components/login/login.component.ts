import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../model/auth';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  value!: string;
  hidePassword: boolean = true;

  Message:any;
  isLoading: boolean = false;
  visible: boolean = false;

  email: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(private _authService: AuthService, private _toastr:ToastrService,
    private _router: Router, private spinner: NgxSpinnerService, public dialogService: DialogService) {}

  // loginForm
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  })


  onSubmitForm(data: FormGroup) {
    this.isLoading = true;

    this._authService.onLogin(data.value).subscribe({
      next: (res: ILogin) => {
        // userToken
        localStorage.setItem('userToken', res.token);
        // getProfile
        this._authService.getProfile();
      }, error: (err: any) => {
        this.isLoading = false;
        this._toastr.error(err.error.message, 'Error!');
      }, complete: () => {
        this.isLoading = false;
        this.spinner.show();
        this._toastr.success('loged in', 'Successfully!');
        this._router.navigate(['/dashboard']);
        setTimeout(() => {
          this.spinner.hide();
        }, 2500);
      }
    })
  }

  // forgetPassword
  showDialog() {
    this.visible = true;
  }

  onForgetPassword(data: string) {
    this._authService.onRequestResetPassword(data).subscribe({
      next: (res) => {
        this.Message = res;
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }, complete: () => {
        this.spinner.show();
        this._toastr.success(this.Message.message, 'Successfully');
        this._router.navigate(['/auth/reset-password']);
        this.ref?.close();
        localStorage.setItem('email', data);
        

        setTimeout(() => {
          this.spinner.hide();
        }, 2500);
      }
    })
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
