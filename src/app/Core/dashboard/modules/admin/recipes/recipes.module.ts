import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
  {path:'',component:RecipesComponent},
  {path:'add',component:AddEditRecipesComponent},
  {path:'edit/:id',component:AddEditRecipesComponent}
]

@NgModule({
  declarations: [
    RecipesComponent,
    AddEditRecipesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class RecipesModule { }
