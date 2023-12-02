import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheardModule } from 'src/app/sheard/sheard.module';
import { RouterModule, Routes } from '@angular/router';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';

const routes: Routes = [
  {path:'',component: UserRecipesComponent},
];

@NgModule({
  declarations: [UserRecipesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ]
})
export class UserRecipesModule { }
