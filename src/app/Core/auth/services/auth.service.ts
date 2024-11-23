import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChangePassword, ILogin, IRegister, IResetPassword, IVerify } from '../model/auth';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role: string | null = '';
  constructor(private _http: HttpClient) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }
  }

  getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('id', decoded.userId)
    localStorage.setItem('name', decoded.userName)
    localStorage.setItem('email', decoded.userEmail)
    localStorage.setItem('role', decoded.userGroup)
    this.getRole();
  }

  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role')) {
      this.role = localStorage.getItem('role');
    }
  }

  // authServices
  onRegister(data: any): Observable<IRegister> {
    return this._http.post<IRegister>(`Users/Register`, data)
  }
  onLogin(data: ILogin): Observable<ILogin> {
    return this._http.post<ILogin>(`Users/Login`, data)
  }
  onVerify(data: IVerify): Observable<IVerify> {
    return this._http.put<IVerify>(`Users/verify`, data)
  }
  // Password
  onRequestResetPassword(data: string): Observable<string> {
    return this._http.post<string>(`Users/Reset/Request`, { email: data })
  }
  onResetPassword(data: IResetPassword): Observable<IResetPassword> {
    return this._http.post<IResetPassword>(`Users/Reset`, data)
  }
  onChangePassword(data: IChangePassword): Observable<IChangePassword> {
    return this._http.put<IChangePassword>(`Users/ChangePassword`, data)
  }

}


