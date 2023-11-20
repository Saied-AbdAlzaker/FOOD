import { UserComponent } from './../user/user.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from '../sheard/sheard.module';
import { UsersComponent } from './users/users.component';
import { CategoriesModule } from './categories/categories.module';

const routes: Routes = [
  {path:'',redirectTo:'admin',pathMatch:'full'},
  {path:'admin',component:AdminComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'recipes',component:RecipesComponent},
  {path:'users',component:UserComponent},
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
