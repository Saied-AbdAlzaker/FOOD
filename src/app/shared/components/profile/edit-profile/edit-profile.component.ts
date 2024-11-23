import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUsers } from 'src/app/Core/dashboard/modules/admin/users/model/users';
import { HelperService } from 'src/app/shared/service/helper.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  currentUser: IUsers | any;
  imgSrc: any;
  imgPath: any;

  userForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9_]{1}[_a-zA-Z0-9\\s]{5,14}$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]),
    profileImage: new FormControl(null),
    confirmPassword: new FormControl(null, [Validators.required]),
  })

  constructor(private _HelperService: HelperService, private _toastr: ToastrService,
    private _router: Router) {
    this.imgPath = _HelperService.imgPath;
    _HelperService.currentUser().subscribe({
      next: (res) => {
        this.currentUser = res; 
        console.log(res);
      },
      error: (err) => { },
      complete: () => {
        this.userForm.patchValue({
          userName: this.currentUser.userName,
          email: this.currentUser.email,
          country: this.currentUser.country,
          phoneNumber: this.currentUser.phoneNumber,
          confirmPassword: this.currentUser.confirmPassword,
          profileImage: this.imgPath + this.currentUser.imagePath
        })
      }
    })
  }

  onSubmit(data: FormGroup) {

    let myData = new FormData();
    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc, this.imgSrc.name);

    this._HelperService.editCurrentUser(data.value).subscribe({
      next: () => {

      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!')
      }, complete: () => {
        this._router.navigate(['/dashboard']);
        this._toastr.success('Profile Update Successfully','Success')
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


}
