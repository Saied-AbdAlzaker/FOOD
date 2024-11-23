import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipes } from '../model/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient: HttpClient) { }

  allRecipes(data: any): Observable<IRecipes> {
    return this._HttpClient.get<IRecipes>(`Recipe`, { params: data })
  }
  recipeById(id: number): Observable<IRecipes> {
    return this._HttpClient.get<IRecipes>(`Recipe/${id}`)
  }
  addRecipe(data: any): Observable<IRecipes> {
    return this._HttpClient.post<IRecipes>(`Recipe`, data)
  }
  editRecipe(data: any, id: number): Observable<IRecipes> {
    return this._HttpClient.put<IRecipes>(`Recipe/${id}`, data)
  }
  deleteRecipe(id: number): Observable<IRecipes> {
    return this._HttpClient.delete<IRecipes>(`Recipe/${id}`)
  }


}
