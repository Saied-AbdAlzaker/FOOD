import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private _HttpClient:HttpClient) { }

getCategories(data:any): Observable<any>{
  return this._HttpClient.get('Category' , {params: data})
}

addCategories(data:any): Observable<any>{
  return this._HttpClient.post('Category' , {name: data})
}

// viewCategories(data:any): Observable<any>{
//   return this._HttpClient.get('Category' , {params: data})
// }

deleteCategories(id:number): Observable<any>{
  return this._HttpClient.delete(`Category/${id}`)
}

editCategories(id:number , data:string): Observable<any>{
  return this._HttpClient.put(`Category/${id}` , {params: data})
}

}
