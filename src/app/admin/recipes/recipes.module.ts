import { AddEditCategoryComponent } from './../categories/components/add-edit-category/add-edit-category.component';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from 'src/app/sheard/sheard.module';

const routes: Routes = [
  {path: '',component: RecipesComponent},
  {path: 'add',component: AddEditRecipesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ],
  declarations: [RecipesComponent,AddEditRecipesComponent]
})
export class RecipesModule { }
