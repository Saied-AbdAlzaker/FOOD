import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITag } from 'src/app/Core/dashboard/modules/admin/recipes/model/recipes';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  imgPath: string = 'https://upskilling-egypt.com:3006/';

  constructor(private _HttpClient: HttpClient) { }

  allTags(): Observable<any> {
    return this._HttpClient.get<any>('tag')
  }

  allCategry(): Observable<any> {
    return this._HttpClient.get('Category', { params: { pageSize: 100 } })
  }

  currentUser():Observable<any>{
    return this._HttpClient.get('Users/currentUser')
  }
  editCurrentUser(data:any):Observable<any>{
    return this._HttpClient.put('Users', data)
  }


}
