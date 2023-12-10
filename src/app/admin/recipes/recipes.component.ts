import { HelperService } from './../../services/helper.service';
import { RecipesService } from './services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ICategory, ITag, IٌRecipe, IٌRecipeTable } from './models/Recipe';
import { DeleteDialogComponent } from 'src/app/sheard/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  constructor(private _RecipesService:RecipesService, 
    private _ToastrService:ToastrService,
    private _HelperService:HelperService,
    private dialog:MatDialog,
    private spinner: NgxSpinnerService) { }

  pageSize:number = 25;
  pageNumber:number | undefined = 1;
  tableResponse:IٌRecipeTable | undefined;
  tableData:IٌRecipe[] = [];
  tags:ITag[] = [];
  categories:ICategory[] = [];
  tagId:any;
  categoryId:any;

  searchValue:string = '';

  ngOnInit() {
    this.spinner.show();
    this.getAllTags();
    this.getAllCategories();
    this.getTableData();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
      tagId: this.tagId,
      categoryId: this.categoryId
    }

    this._RecipesService.getRecipes(params).subscribe({
      next: (res: IٌRecipeTable) => {
        // console.log(res.data);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
      }
    })
  }

  getAllTags(){
    this._HelperService.getTags().subscribe({
      next: (res)=>{
        // console.log(res);
        this.tags = res;
      }
    })
  }

  getAllCategories(){
    this._HelperService.getCategories().subscribe({
      next: (res)=>{
        // console.log(res.data);
        this.categories = res.data;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.getTableData();
  }

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
      this.onDeleteRecipe(result.id);
      }
    });
  }
  onDeleteRecipe(id: number){
    this._RecipesService.deleteRecipes(id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err)=>{
        console.log(err);
      }, complete: ()=>{
        this._ToastrService.success('Recipe Deleted Successfully', 'Ok');
        this.getTableData();
      }
      })
}

}