import { RecipeDataComponent } from './../recipe-data/recipe-data.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { IٌRecipeTable, IٌRecipe, ITag, ICategory } from 'src/app/admin/recipes/models/Recipe';
import { RecipesService } from 'src/app/admin/recipes/services/recipes.service';
import { HelperService } from 'src/app/services/helper.service';
import { DeleteDialogComponent } from 'src/app/sheard/delete-dialog/delete-dialog.component';
import { FavoritesService } from '../../favorites/services/favorites.service';
@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnInit {

  constructor(private _RecipesService:RecipesService, 
    private _ToastrService:ToastrService,
    private _HelperService:HelperService,
    private dialog:MatDialog,
    private _FavoritesService:FavoritesService,
    private toastr:ToastrService) { }

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
    this.getTableData();
    this.getAllTags();
    this.getAllCategories();
  }

  openViewDialog(recipeItem: IٌRecipe) {
    const dialogRef = this.dialog.open(RecipeDataComponent, {
      data: recipeItem,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result){
      console.log(result);
      this.addToFavorites(result);
    }
  });

  }

   Message:string='';

  addToFavorites(id: number){
    this._FavoritesService.onAddRecipeToFavorite(id).subscribe({
      next: (res)=>{
        console.log(res);
        this.Message = res.message;
      },error: (err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
        
      },complete: ()=>{
        this.toastr.success('Recipe Add To My Favorite', 'Successfully!');
      }
    })
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
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
      }
    })
  }

  getAllTags(){
    this._HelperService.getTags().subscribe({
      next: (res)=>{
        console.log(res);
        this.tags = res;
      }
    })
  }

  getAllCategories(){
    this._HelperService.getCategories().subscribe({
      next: (res)=>{
        console.log(res.data);
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
