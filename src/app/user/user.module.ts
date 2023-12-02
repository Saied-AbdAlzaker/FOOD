import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SheardModule } from '../sheard/sheard.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component: UserComponent},
  {path: 'recipes',loadChildren: () => import('./modules/user-recipes/user-recipes.module').then(mod => mod.UserRecipesModule)},
  {path: 'favorites',loadChildren: () => import('./modules/favorites/favorites.module').then(mod => mod.FavoritesModule)},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
