import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

constructor(private _HttpClient:HttpClient) { }

onAddRecipeToFavorite(id: number): Observable<any>
{
  return this._HttpClient.post('userRecipe', {recipeId: id})
}


onGetAllFavorite(): Observable<any>
{
  return this._HttpClient.get('userRecipe')
}

onRemoveFavorite(id: number): Observable<any>
{
  return this._HttpClient.delete(`userRecipe/${id}`)
}
}
