import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheardModule } from 'src/app/sheard/sheard.module';
import { RouterModule, Routes } from '@angular/router';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { RecipesComponent } from 'src/app/admin/recipes/recipes.component';
import { RecipeDataComponent } from './recipe-data/recipe-data.component';

const routes: Routes = [
  {path:'',component: UserRecipesComponent},
];

@NgModule({
  declarations: [UserRecipesComponent,RecipeDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ]
})
export class UserRecipesModule { }
