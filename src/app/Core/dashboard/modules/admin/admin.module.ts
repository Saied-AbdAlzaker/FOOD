import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/shared/components/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((mod) => mod.UsersModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then((mod) => mod.RecipesModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then((mod) => mod.CategoriesModule)
  },
]

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
