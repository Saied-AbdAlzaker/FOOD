import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/shared/components/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path: 'recipes',
    loadChildren: () => import('./user-recipes/user-recipes.module').then((mod) => mod.UserRecipesModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./user-favorites/user-favorites.module').then((mod) => mod.UserFavoritesModule)
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
