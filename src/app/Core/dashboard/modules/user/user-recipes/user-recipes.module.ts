import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { RecipeDetailsComponent } from './user-recipes/recipe-details/recipe-details.component';

const routse: Routes = [
  { path: '', component: UserRecipesComponent },
]

@NgModule({
  declarations: [
    UserRecipesComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routse),
    SharedModule
  ]
})
export class UserRecipesModule { }
