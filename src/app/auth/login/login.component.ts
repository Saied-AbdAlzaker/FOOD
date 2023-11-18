import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private toastr:ToastrService) { }

  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  })

  onSubmit(data: FormGroup){
    console.log(data);
    this._AuthService.onLogin(data.value).subscribe({
      next: (res)=> {
        console.log(res);
        
      }, error: (err: any)=> {
        console.log(err);
        this.toastr.error('Hello world!', 'Toastr fun!');
        
      } , complete: ()=> {
        this.toastr.success('Hello world!', 'Toastr fun!');
      }
    })
  }

  ngOnInit() {
    
  }

}
