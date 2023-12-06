import { DeleteDialogComponent } from './../../sheard/delete-dialog/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { ICategory, ICategoryTable } from './models/category';
import { CategoryService } from './services/category.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryId:any;
  categoryData: ICategory | any;
  isUpdatePage:boolean = false;

  constructor(private _CategoryService:CategoryService, 
    private dialog:MatDialog, private _ToastrService:ToastrService,
    private _ActivatedRoute:ActivatedRoute) {}

  pageSize:number=10;
  pageNumber:number | undefined = 1;
  tableResponse:ICategoryTable | undefined;
  tableData:ICategory[] = [];

  searchValue:string = '';

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue
    }

    this._CategoryService.getCategories(params).subscribe({
      next: (res: ICategoryTable) => {
        // console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = this.tableResponse?.pageNumber;
    this.getTableData();
    
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex; // More Than One Page
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { },
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onAddNewCategory(result);
    });
  }

  onAddNewCategory(data: String){
    this._CategoryService.addCategories(data).subscribe({
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
categoryName: string = '';

// Edit
  openEditDialog(categoryData: any): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {categoryName: categoryData.name},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(categoryData.name,categoryData.id);
      if(result){
        this.onEditCategory(result,categoryData.id);
      }
    });
  }

  onEditCategory(data:any,id:number){
    this._CategoryService.editCategories(data,id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err)=>{
        console.log(err);
      }, complete: ()=>{
        this._ToastrService.success('Category Edit Successfully', 'Ok');
        this.getTableData();
      }
      })
}

// getCategoriesById(id: number){
//         this._CategoryService.getCategoryById(id).subscribe({
//           next: (res)=>{
//             console.log(res);
//             this.categoryData = res.data;
//           }, error: (err)=>{
//             console.log(err);
//           }, complete: ()=>{
//             // this.categoryForm.patchValue({
//             //   name: this.categoryData?.name
//             // })
//           }
//         })
//       }


// Delete
  openDeleteDialog(categoryData: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: categoryData,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      if(result){
        // console.log(result.id);
      this.onDeleteCategory(result.id);
      }
    });
  }
  onDeleteCategory(id: number){
    this._CategoryService.deleteCategories(id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err)=>{
        console.log(err);
      }, complete: ()=>{
        this._ToastrService.success('Category Deleted Successfully', 'Ok');
        this.getTableData();
      }
      })
}

// View
openViewDialog(categoryData: any): void {
  const dialogRef = this.dialog.open(ViewCategoryComponent, {
    data: categoryData,
    width: '60%',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // console.log(result);
    if(result){
    this.getTableData();
    }
  });
}

}
