import { SheardModule } from './../../sheard/sheard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';


const routes: Routes = [
  {path: '',component: CategoriesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ],
  declarations: [CategoriesComponent, AddEditCategoryComponent, ViewCategoryComponent]
})
export class CategoriesModule { }
