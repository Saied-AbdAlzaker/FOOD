import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../auth/models/login';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  currentUser: IRegister | any;
  imgSrc: any;

  userForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9_]{1}[_a-zA-Z0-9\\s]{5,14}$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]),
    profileImage: new FormControl(null, [Validators.required]),
    // password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null, [Validators.required]),
  })

  constructor(private _HelperService:HelperService,
    private _toastrService:ToastrService,
    private _router:Router) {

    this._HelperService.getCurrentUser().subscribe({
      next: (res)=>{
        // console.log(res);
        this.currentUser = res;
      },error: (err)=>{
        console.log(err);
      }, complete: ()=>{
        this.imgSrc = 'https://upskilling-egypt.com/' + this.currentUser.imagePath ;
        this.userForm.patchValue({
          userName: this.currentUser?.userName,
          email: this.currentUser?.email,
          country: this.currentUser?.country,
          phoneNumber: this.currentUser?.phoneNumber,
          confirmPassword: this.currentUser?.confirmPassword,
        })
      }
    })
  }

  ngOnInit() {
  }

}
