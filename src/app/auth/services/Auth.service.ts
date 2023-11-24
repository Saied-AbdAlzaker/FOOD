import { IChange } from './../models/reset';
import { ILogin } from './../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReset } from '../models/reset';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) {
  if(localStorage.getItem('userToken') !== null){
    this.getProfile();
  }
 }

role: string | null = '';
getProfile(){
  let encoded: any = localStorage.getItem('userToken');
  let decoded: any = jwtDecode(encoded);
  console.log(decoded.userGroup);
  console.log(decoded.userName);
  localStorage.setItem('role',decoded.userGroup);
  localStorage.setItem('userName',decoded.userName);
  this.getRole();
}

getRole(){
  if(localStorage.getItem('userToken') !== null && localStorage.getItem('role')){
    this.role = localStorage.getItem('role');
  }
}

onLogin(data:ILogin){
  return this.http.post('Users/Login', data)
}

onRequestResetPassword(data:string){
  return this.http.post('Users/Reset/Request', {email: data})
}

onResetPassword(data:IReset){
  return this.http.post('Users/Reset', data)
}

onChangePassword(data:any){
  return this.http.put('Users/ChangePassword', data)
}

}
