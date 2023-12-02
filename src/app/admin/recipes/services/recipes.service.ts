import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient:HttpClient) { }

  getRecipes(data:any): Observable<any>{
    return this._HttpClient.get('Recipe' , {params: data})
  }

  getRecipeById(id:number): Observable<any>{
    return this._HttpClient.get(`Recipe/${id}`)
  }
  
  addRecipes(data:any): Observable<any>{
    return this._HttpClient.post('Recipe' , data)
  }

  editRecipes(data: any , id: number): Observable<any>{
    return this._HttpClient.put(`Recipe/${id}` , data)
  }
  
  deleteRecipes(id:number): Observable<any>{
    return this._HttpClient.delete(`Recipe/${id}`)
  }
  
}
