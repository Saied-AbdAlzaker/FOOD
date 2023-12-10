import { RequestResetPasswordComponent } from './../request-reset-password/request-reset-password.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService,
     private toastr:ToastrService, 
     public dialog: MatDialog,
     private router:Router,
     private spinner: NgxSpinnerService) { }

  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  })

  Message:string='';
  onSubmit(data: FormGroup){
    this._AuthService.onLogin(data.value).subscribe({
      next: (res: any)=> {
        this.Message = res.message;
        
        localStorage.setItem('userToken',res.token);
        this._AuthService.getProfile();
      }, error: (err: any)=> {
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
        
      } , complete: ()=> {
        this.spinner.show();
        this.router.navigate(['/dashboard'])
        this.toastr.success('Logged In', 'Successfully!');
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 3000);
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
      data: { },
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onRquestReset(result);
    });

  }

  errorMessage:string='';
  onRquestReset(data: string){
    // let dataObj = {
    //   email: data
    // }
    
    this._AuthService.onRequestResetPassword(data).subscribe({
      next: (res: any)=>{
        this.errorMessage = res.message;
      }, error: (err)=>{
        this.toastr.error(err.error.message, 'Error!');
      },complete: ()=>{
        this.spinner.show();
        this.toastr.success(this.errorMessage, 'Successfully!');
        this.router.navigate(['/auth/resetPassword']);
        localStorage.setItem('email' , data);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 3000);
      }
    })
  }

  hide:boolean = true;
  

  ngOnInit() {

  }

}
