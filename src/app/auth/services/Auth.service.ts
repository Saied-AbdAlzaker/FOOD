import { ILogin } from './../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReset } from '../models/reset';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) { }

onLogin(data:ILogin){
  return this.http.post('Users/Login', data)
}

onRequestResetPassword(data:string){
  return this.http.post('Users/Reset/Request', {email: data})
}

ontResetPassword(data:IReset){
  return this.http.post('Users/Reset', data)
}

}
