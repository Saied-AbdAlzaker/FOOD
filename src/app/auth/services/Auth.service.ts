import { ILogin } from './../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) { }

onLogin(data:ILogin){
  return this.http.post('Users/Login', data)
}

}
