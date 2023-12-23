import { VerifyComponent } from './../verify/verify.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/Auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  hide: boolean = true;
  hideConfirm: boolean = true;
  imgSrc: any;
  Message: string = 'Register Success';
  isLoading:boolean = false;

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

    matchPasswords(form: any){
      let password = form.get('password');
      let confirmPassword = form.get('confirmPassword');
    
      if(password.value == confirmPassword.value){
        return null
      } else{
        confirmPassword.setErrors({invalid: 'Password And Confirm Password Not Match'});
        return {invalid: 'Password And Confirm Password Not Match'};
      }
    }

  onSubmit(data: FormGroup) {
    this.isLoading = true;
    let myData = new FormData();
    myData.append('userName',data.value.userName);
    myData.append('email',data.value.email);
    myData.append('country',data.value.country);
    myData.append('phoneNumber',data.value.phoneNumber);
    myData.append('profileImage',this.imgSrc,this.imgSrc.name);
    myData.append('password',data.value.password);
    myData.append('confirmPassword',data.value.confirmPassword);

    // console.log(data.value);
    // let myMap = new Map(Object.entries(data.value));
    // console.log(myMap);
    // for (const [key, val] of myMap) {
    //   console.log(key, val);
    //   myData.append(key, data.value[key]);
    //   // myData.append(key , JSON.stringify(val));
    //   myData.append('profileImage', this.imgSrc, this.imgSrc.name);

    // }

    this._AuthService.onRegister(myData).subscribe({
      next: (res: any) => {
        console.log(res);

      }, error: (err: any) => {
        this.isLoading = false;

        console.log(err);
        this.toastr.error(err.error.message, 'Error!');

      }, complete: () => {
        this.spinner.show();
        this.isLoading = false;

        this.openDialog()
        this.toastr.success( this.Message, 'Successfully!');
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 3000);
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: {},
      width: '40%',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.onRquestReset(result);
    // });

  }

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


  ngOnInit() {

  }
}
