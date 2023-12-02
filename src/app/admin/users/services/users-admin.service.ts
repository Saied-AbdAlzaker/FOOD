import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService {

constructor(private _HttpClient:HttpClient) { }

getAllUsers(data: any):Observable<any>{
  return this._HttpClient.get('Users' , {params: data})
}

deleteAdminUser(id:number): Observable<any>{
  return this._HttpClient.delete(`Users/${id}`)
}

}
