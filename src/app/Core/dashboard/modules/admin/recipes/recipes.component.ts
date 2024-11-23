import { Component } from '@angular/core';
import { RecipesService } from './services/recipes.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { IRecipes, IRecipeTable, ITag } from './model/recipes';
import { HelperService } from 'src/app/shared/service/helper.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ICategory } from '../categories/model/categories';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {

  tableResponse!: IRecipeTable;
  tableData: IRecipes | any;
  tags: ITag[]=[];
  categories: ICategory[]=[];
  pageNumber: number = 1;
  pageSize: number = 10;
  searchValue: string = '';
  imgPath: string;
  tagId: any;
  categoryId: any;

  constructor(private _RecipesService: RecipesService, private _toastr: ToastrService,
    private dialog: MatDialog, private _HelperService: HelperService) {
    this.imgPath = _HelperService.imgPath;
  }

  ngOnInit() {
    this.getAllRecipes();
    this.getAllTags();
    this.getAllCategory();
  }

  getAllRecipes() {
    let params = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      name: this.searchValue,
      tagId:this.tagId,
      categoryId:this.categoryId
    }

    this._RecipesService.allRecipes(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse.data;
      }
    })
  }
  // Tags
  getAllTags() {
    this._HelperService.allTags().subscribe({
      next: (res) => {
        console.log(res);
        
        this.tags = res;
      }
    })
  }
  // Category
  getAllCategory(){
    this._HelperService.allCategry().subscribe({
      next:(res)=>{
        console.log(res);

        this.categories=res.data;
      }
    })
  }
  // Delete
  openDeleteDialog(tableData: IRecipes, enterAnimationDuration: string, exitAnimationDuration: string): void {
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
    this._RecipesService.deleteRecipe(id).subscribe({
      next: (res: IRecipes) => {

      }, error: (err: string) => {
        this._toastr.error('Recipe Not Deleted', 'Error!')
      }, complete: () => {
        this._toastr.success('Recipe Deleted Successfully', 'Ok');
        this.getAllRecipes();
      }
    })
  }

}
