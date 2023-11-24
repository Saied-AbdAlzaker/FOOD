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
  userPassword = localStorage.getItem('oldPassword');

  changeForm = new FormGroup({
    oldPassword: new FormControl(this.userPassword,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmNewPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  })

  onChangeSubmit(data: FormGroup){
    this._AuthService.onChangePassword(data.value).subscribe({
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

  hideOld:boolean = true;
  hideNew:boolean = true;
  hideConfirm:boolean = true;


  ngOnInit() {
  }

}
