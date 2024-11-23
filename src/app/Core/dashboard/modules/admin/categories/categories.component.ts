import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ICategory, ICategoryTable } from './model/categories';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateCategoryComponent } from './components/add-update-category/add-update-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  tableResponse!: ICategoryTable;
  tableData: ICategory | any ;
  pageNumber: number = 1;
  pageSize: number = 10;
  searchValue: string = '';
  categoryName: string = '';

  constructor(private _CategoryService: CategoryService, private _toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    let params = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      name: this.searchValue
    }

    this._CategoryService.getCategoies(params).subscribe({
      next: (res: ICategoryTable) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse.data;
      }
    })
  }
  // Add
  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddUpdateCategoryComponent, {
      data: {},
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onAddCategory(result);
    });
  }

  onAddCategory(data: string) {
    this._CategoryService.addCategory(data).subscribe({
      next: (res: string) => {

      }, error: (err: string) => {
        this._toastr.error('Category Not Added', 'Error!')
      }, complete: () => {
        this._toastr.success('Category Added Successfully', 'Ok');
        this.getAllCategory();
      }
    })
  }
  // View
  openViewDialog(tableData: ICategory, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      data: tableData,
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onViewCategory(result,tableData.id);
    });
  }

  onViewCategory(data:ICategory, id: number) {
    this._CategoryService.getCategoryById(data,id).subscribe({
      next: (res: ICategory) => {

      },error:(err)=>{

      },complete:()=>{
        this.getAllCategory();
      }
    })
  }

  // Edit
  openEditDialog(tableData: ICategory, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddUpdateCategoryComponent, {
      data: tableData,
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result, tableData.id);
      // if(result){
        this.onEditCategory(result, tableData.id);
      // }
    });
  }

  onEditCategory(data: string, id: number) {
    this._CategoryService.editCategory(data, id).subscribe({
      next: (res: string) => {

      }, error: (err: string) => {
        this._toastr.error('Category Not Edit', 'Error!')
      }, complete: () => {
        this._toastr.success('Category Edit Successfully', 'Ok');
        this.getAllCategory();
      }
    })
  }
  // Delete
  openDeleteDialog(tableData:ICategory,enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: tableData,
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onDeleteCategory(result.id);
    });
  }

  onDeleteCategory(id: number) {
    this._CategoryService.deleteCategory(id).subscribe({
      next: (res: ICategory) => {

      }, error: (err: string) => {
        this._toastr.error('Category Not Deleted', 'Error!')
      }, complete: () => {
        this._toastr.success('Category Deleted Successfully', 'Ok');
        this.getAllCategory();
      }
    })
  }


}
