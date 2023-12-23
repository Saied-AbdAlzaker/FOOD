import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerifyComponent>,
    private _AuthService:AuthService, private toastr:ToastrService,
    private router:Router) {}

  Message:string='Register Success';
  userEmail = localStorage.getItem('email');

  verifyForm = new FormGroup({
    email: new FormControl(this.userEmail,[Validators.required,Validators.email]),
    code: new FormControl(null,[Validators.required]),
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onSubmit(data: FormGroup){
    console.log(data.value);

    this._AuthService.onVerifyAccount(data.value).subscribe({
      next: (res)=>{
        console.log(res);

      }, error: (err)=>{
        this.toastr.error(err.error.message, 'Error!');

      }, complete: ()=>{
        this.router.navigate(['/auth/login'])
        this.toastr.success(this.Message, 'Successfully!');
      }
    })
  }

}
