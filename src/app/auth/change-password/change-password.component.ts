import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(private _AuthService:AuthService,
    private toastr:ToastrService,
    private router:Router) { }

  errorMessage:string=''

  changeForm = new FormGroup({
    oldPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmNewPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  },
  {
    validators: this.matchPasswords
  })

  matchPasswords(form: any){
    let newPassword = form.get('newPassword');
    let confirmNewPassword = form.get('confirmNewPassword');
  
    if(newPassword.value == confirmNewPassword.value){
      return null
    } else{
      confirmNewPassword.setErrors({invalid: 'New Password And Confirm Password Not Match'});
      return {invalid: 'New Password And Confirm Password Not Match'};
    }
  }

  onChangeSubmit(data: FormGroup){
    this._AuthService.onChangePassword(data.value).subscribe({
      next: (res: any)=> {
        this.errorMessage = res.message;
        
      }, error: (err: any)=> {
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
        
      } , complete: ()=> {
        this.router.navigate(['/dashboard'])
        this.toastr.success(this.errorMessage, 'Successfully!');
      }
    })
  }

  hideOld:boolean = true;
  hideNew:boolean = true;
  hideConfirm:boolean = true;


  ngOnInit() {
  }

}
