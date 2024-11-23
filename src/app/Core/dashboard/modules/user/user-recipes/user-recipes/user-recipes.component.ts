import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/shared/service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../../admin/categories/model/categories';
import { IRecipeTable, IRecipes, ITag } from '../../../admin/recipes/model/recipes';
import { RecipesService } from '../../../admin/recipes/services/recipes.service';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { UserRecipesService } from '../../services/user-recipes.service';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnInit {

  tableResponse!: IRecipeTable;
  tableData: IRecipes | any;
  tags: ITag[] = [];
  categories: ICategory[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  searchValue: string = '';
  tagId: any;
  categoryId: any;
  imgPath: string;

  constructor(private _UserRecipesService: UserRecipesService, private _toastr: ToastrService,
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
      tagId: this.tagId,
      categoryId: this.categoryId
    }

    this._UserRecipesService.allRecipes(params).subscribe({
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
  getAllCategory() {
    this._HelperService.allCategry().subscribe({
      next: (res) => {
        console.log(res);

        this.categories = res.data;
      }
    })
  }

  // View
  openViewDialog(tableData: IRecipes, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(RecipeDetailsComponent, {
      data: tableData,
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        console.log(result);
        this.addMyFavorites(result);
      }
    });
  }

  addMyFavorites(id: number) {
    this._UserRecipesService.addToFavorites(id).subscribe({
      next: (res) => {

      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!')
      }, complete: () => {
        this._toastr.success('Recipe Add To My Favorite', 'Successfully')
      }
    })
  }


}
