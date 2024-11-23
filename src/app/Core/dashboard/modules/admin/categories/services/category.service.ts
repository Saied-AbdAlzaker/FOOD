import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../model/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient: HttpClient) { }

  getCategoies(data: any): Observable<any> {
    return this._HttpClient.get<any>('Category', { params: data })
  }
  addCategory(data: string): Observable<string> {
    return this._HttpClient.post<string>('Category', { name: data })
  }
  getCategoryById(data: any, id: number): Observable<any> {
    return this._HttpClient.get<any>(`Category/${id}`, { params: data })
  }
  editCategory(data: string, id: number): Observable<string> {
    return this._HttpClient.put<string>(`Category/${id}`, { name: data })
  }
  deleteCategory(id: number): Observable<ICategory> {
    return this._HttpClient.delete<ICategory>(`Category/${id}`)
  }


}
