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
  
  addRecipes(data:any): Observable<any>{
    return this._HttpClient.post('Recipe' , {name: data})
  }
  
  deleteRecipes(id:number): Observable<any>{
    return this._HttpClient.delete(`Recipe/${id}`)
  }
  
  // editRecipes(id:number , data:string): Observable<any>{
  //   return this._HttpClient.put(`Category/${id}` , {params: data})
  // }
  

}
