import { RecipesService } from './services/recipes.service';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/sheard/delete-dialog/delete-dialog.component';
import { AddEditCategoryComponent } from '../categories/comp/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from '../categories/comp/view-category/view-category.component';
import { ICategoryTable, ICategory } from '../categories/models/category';
import { CategoryService } from '../categories/services/category.service';
import {IٌRecipes, IٌRecipesTable } from './models/Recipes';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(private _RecipesService:RecipesService, private dialog:MatDialog, private _ToastrService:ToastrService) { }

  pageSize:number=10;
  pageNumber:number | undefined = 1;
  tableResponse:IٌRecipesTable | undefined;
  tableData:IٌRecipes[] | undefined = [];

  searchValue:string = '';

  loading:boolean=false;

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue
    }

    this._RecipesService.getRecipes(params).subscribe({
      next: (res) => {
        // console.log(res);
        this.tableResponse = res;
        // this.tableData = this.tableResponse?.data;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    // this.pageNumber = this.tableResponse?.pageNumber;
    this.getTableData();
    
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex; // More Than One Page
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditRecipesComponent, {
      data: { },
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onAddNewRecipes(result);
    });
  }

  onAddNewRecipes(data: String){
    this._RecipesService.addRecipes(data).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err)=>{
        console.log(err);
      }, complete: ()=>{
        this._ToastrService.success('Category Added Successfully', 'Ok');
        this.getTableData();
      }
      })
}

//   openViewDialog(categoryData: any): void {
//     const dialogRef = this.dialog.open(ViewCategoryComponent, {
//       data: categoryData,
//       width: '100%',
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       // console.log(result);
//       this.onAddNewCategory(result);
//     });
//   }
// //   onViewCategory(data: String){
// //     this._RecipesService.addCategories(data).subscribe({
// //       next: (res) => {
// //         console.log(res);
// //       }, error: (err)=>{
// //         console.log(err);
// //       }, complete: ()=>{
// //         this._ToastrService.success('Category Added Successfully', 'Ok');
// //         this.getTableData();
// //       }
// //       })
// // }

//   openEditDialog(categoryData: any): void {
//     const dialogRef = this.dialog.open(AddEditCategoryComponent, {
//       data: categoryData,
//       width: '40%',
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       // console.log(result);
//       if(result){
//         // console.log(result.id);
//         this.onEditCategory(result.id);
//         this.getTableData();
//       }
//     });
//   }

//   onEditCategory(data:any){
//     this._RecipesService.editCategories(data , data.id).subscribe({
//       next: (res) => {
//         console.log(res);
//       }, error: (err)=>{
//         console.log(err);
//       }, complete: ()=>{
//         this._ToastrService.success('Category Edit Successfully', 'Ok');
//         this.getTableData();
//       }
//       })
// }

//   openDeleteDialog(categoryData: any): void {
//     const dialogRef = this.dialog.open(DeleteDialogComponent, {
//       data: categoryData,
//       width: '40%',
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       // console.log(result);
//       if(result){
//         // console.log(result.id);
//       this.onDeleteCategory(result.id);
//       }
//     });
//   }
//   onDeleteCategory(id: number){
//     this._RecipesService.deleteCategories(id).subscribe({
//       next: (res) => {
//         console.log(res);
//       }, error: (err)=>{
//         console.log(err);
//       }, complete: ()=>{
//         this._ToastrService.success('Category Deleted Successfully', 'Ok');
//         this.getTableData();
//       }
//       })
// }
}
