import { UserComponent } from './../user/user.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from '../sheard/sheard.module';

const routes: Routes = [
  {path: '',component: AdminComponent},
  {path: 'users',loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)},
  {path: 'recipes',loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule)},
  {path: 'categories',loadChildren: () => import('./categories/categories.module').then(mod => mod.CategoriesModule)},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
