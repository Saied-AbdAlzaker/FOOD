import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/Auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _AuthService:AuthService,
    private toastr:ToastrService,
    private router:Router) { }

  errorMessage:string=''
  userEmail = localStorage.getItem('email');

  resetForm = new FormGroup({
    email: new FormControl(this.userEmail,[Validators.required,Validators.email]),
    seed: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  },
  {
    validators: this.matchPasswords
  })

  onSubmit(data: FormGroup){
    this._AuthService.onResetPassword(data.value).subscribe({
      next: (res: any)=> {
        this.errorMessage = res.message;
        
      }, error: (err: any)=> {
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
        
      } , complete: ()=> {
        this.toastr.success(this.errorMessage, 'Successfully!');
        this.router.navigate(['/dashboard'])
      }
    })
  }

  hide:boolean = true;
  hideConfirm:boolean = true;

  matchPasswords(form: any){
    let password = form.get('password');
    let confirmPassword = form.get('confirmPassword');
  
    if(password.value == confirmPassword.value){
      return null
    } else{
      confirmPassword.setErrors({invalid: 'New Password And Confirm Password Not Match'});
      return {invalid: 'New Password And Confirm Password Not Match'};
    }
  }


  ngOnInit() {
  }

}
