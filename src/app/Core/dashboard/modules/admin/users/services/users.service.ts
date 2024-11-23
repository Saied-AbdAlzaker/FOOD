import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsersTable } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) { }

  allUsers(data:any): Observable<IUsersTable> {
    return this._HttpClient.get<IUsersTable>('Users',{params:data})
  }

  deleteUsers(id: number): Observable<any> {
    return this._HttpClient.delete(`Users/${id}`)
  }

}
