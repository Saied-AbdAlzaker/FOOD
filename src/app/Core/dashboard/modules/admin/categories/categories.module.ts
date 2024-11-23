import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddUpdateCategoryComponent } from './components/add-update-category/add-update-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
  {path:'',component:CategoriesComponent}
]

@NgModule({
  declarations: [
    CategoriesComponent,
    AddUpdateCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CategoriesModule { }
