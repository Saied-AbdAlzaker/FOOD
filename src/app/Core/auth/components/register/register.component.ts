import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IRegister, IVerify } from '../../model/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  imgSrc: any;
  Message: any;
  isLoading: boolean = false;
  visible: boolean = false;

  constructor(private _authService: AuthService, private _toastr: ToastrService,
    private _router: Router, private spinner: NgxSpinnerService) { }

  // RegisterForm
  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9_]{1}[_a-zA-Z0-9\\s]{5,14}$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]),
    profileImage: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null, [Validators.required]),
  },
    {
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
    let myData = new FormData();
    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc, this.imgSrc.name);

    // let myMap = new Map(Object.entries(data.value));
    // console.log(myMap);

    // for (const [key, val] of myMap) {
    //   console.log(key,val);
    //   console.log(data.value[key]);

    //   myData.append(key, data.value[key]);
    //   // myData.append(key , JSON.stringify(val));
    //   myData.append('profileImage',this.imgSrc,this.imgSrc.name);
    // }

    this._authService.onRegister(myData).subscribe({
      next: (res: IRegister) => {
        console.log(res);
        this.Message = res;
      }, error: (err: any) => {
        this.isLoading = false;
        this._toastr.error(err.error.message, 'Error!')
      }, complete: () => {
        this.isLoading = false;
        this.showDialog();
        this._toastr.success(this.Message.message, 'Successfully!');
      }
    })
  }

  // ImageFile
  files: File[] = [];

  onSelect(event: any) {
    this.imgSrc = event.addedFiles[0];
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // Verify Account
  userEmail = localStorage.getItem('email');

  verifyForm = new FormGroup({
    email: new FormControl(this.userEmail, [Validators.required, Validators.email]),
    code: new FormControl(null, Validators.required)
  })

  onSubmit(data: FormGroup) {
    this.isLoading = true;

    this._authService.onVerify(data.value).subscribe({
      next: (res: IVerify) => {
        console.log(res);
        this.Message = res;
      }, error: (err: any) => {
        this.isLoading = false;
        this._toastr.error(err.error.message, 'Error!')
      }, complete: () => {
        this.isLoading = false;
        this._router.navigate(['auth/login']);
        this._toastr.success(this.Message.message, 'Successfully!');
      }
    })
  }

  showDialog() {
    this.visible = true;
  }

}
