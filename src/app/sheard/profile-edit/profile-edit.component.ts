import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRegister } from 'src/app/auth/models/login';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  hide: boolean = true;
  hideConfirm: boolean = true;
  imgSrc: any;
  currentUser: IRegister | any;
  
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

  onSubmit(data:FormGroup){
    let myData = new FormData();

    console.log(data.value);
    let myMap = new Map(Object.entries(data.value));
    console.log(myMap);

    for (const [key, val] of myMap) {
      console.log(key, val);
      myData.append(key, data.value[key]);
    }

    myData.append('profileImage', this.imgSrc, this.imgSrc.name);

    // let myData = new FormData();
    // myData.append('userName',data.value.userName);
    // myData.append('email',data.value.email);
    // myData.append('country',data.value.country);
    // myData.append('phoneNumber',data.value.phoneNumber);
    // myData.append('confirmPassword',data.value.confirmPassword);
    // myData.append('profileImage', this.imgSrc, this.imgSrc['name']);

      this._HelperService.updateCurrentUser(myData).subscribe({
        next: (res)=>{
          console.log(res);
        }, error: (err)=>{
          this._toastrService.error('Profile Not Update', 'Ok');
        }, complete: ()=>{
          this._router.navigate(['/dashboard'])
          this._toastrService.success('Profile Update Successfully', 'Ok');
        }
      })
   
  }

  files: File[] = [];

  onSelect(event: any) {
    // this.imgSrc = event.target.result;
    this.imgSrc = event.addedFiles[0];
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  ngOnInit() {
  }

}
