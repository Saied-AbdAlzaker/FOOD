import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipes } from '../../admin/recipes/model/recipes';

@Injectable({
  providedIn: 'root'
})
export class UserRecipesService {

  constructor(private _HttpClient: HttpClient) { }

  allRecipes(data: any): Observable<IRecipes> {
    return this._HttpClient.get<IRecipes>(`Recipe`, { params: data })
  }

  addToFavorites(id: number): Observable<any> {
    return this._HttpClient.post('userRecipe', { recipeId: id })
  }
  allFavorites(parms:any): Observable<any> {
    return this._HttpClient.get('userRecipe',{params:parms})
  }
  deleteFavorites(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`)
  }

}
