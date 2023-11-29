import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from 'src/app/sheard/sheard.module';

const routes: Routes = [
  {path: '',component: RecipesComponent},
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
