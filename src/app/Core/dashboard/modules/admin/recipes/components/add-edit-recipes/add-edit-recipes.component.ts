import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/service/helper.service';
import { IRecipes, ITag } from '../../model/recipes';
import { ICategory } from '../../../categories/model/categories';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})
export class AddEditRecipesComponent implements OnInit {

  isUpdate: boolean = false;
  tags: ITag[] = [];
  categories: ICategory[] = [];
  imgSrc: any;
  imgPath: any;
  recipeId: any;
  recipeData: IRecipes | any;
  files: File[] = [];

  constructor(private _HelperService: HelperService, private _RecipesService: RecipesService,
    private _ActivatedRoute: ActivatedRoute, private _toastr: ToastrService, private _router: Router
  ) {
    this.imgPath = _HelperService.imgPath;
    this.recipeId = _ActivatedRoute.snapshot.params['id'];
    console.log(_ActivatedRoute.snapshot.params['id']);

    if (this.recipeId) {
      this.isUpdate = true;
      this.getRecipeById(this.recipeId)
    } else {
      this.isUpdate = false;
    }
  }

  ngOnInit(): void {
    this.getAllTags();
    this.getAllCategory();
  }

  recipeForm = new FormGroup({
    name: new FormControl(null),
    tagId: new FormControl(null),
    price: new FormControl(null),
    categoriesIds: new FormControl(null),
    description: new FormControl(null),
  })

  onSubmit(data: FormGroup) {
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('tagId', data.value.tagId);
    myData.append('price', data.value.price);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('description', data.value.description);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);

    if (this.recipeId) {
      this._RecipesService.editRecipe(myData, this.recipeId).subscribe({
        next: (res) => {

        }, error: (err) => {
          this._toastr.error('Recipe Not Update', 'Error!')
        }, complete: () => {
          this._router.navigate(['/dashboard/admin/recipes']);
          this._toastr.success('Recipe Update Successfully', 'Success');
        }
      })
    } else {
      this._RecipesService.addRecipe(myData).subscribe({
        next: (res) => {

        }, error: (err) => {
          this._toastr.error('Recipe Not Added', 'Error!')
        }, complete: () => {
          this._router.navigate(['/dashboard/admin/recipes']);
          this._toastr.success('Recipe Add Successfully', 'Success');
        }
      })
    }

  }

  getRecipeById(id: number) {
    this._RecipesService.recipeById(id).subscribe({
      next: (res) => {
        this.recipeData = res;
      }, error: (err) => {

      }, complete: () => {
        this.imgSrc = this.imgPath + this.recipeData.imagePath;
        this.recipeForm.patchValue({
          name: this.recipeData?.name,
          tagId: this.recipeData?.tag.id,
          price: this.recipeData?.price,
          categoriesIds: this.recipeData?.category[0].id,
          description: this.recipeData?.description,
        })
      }
    })
  }

  // Tags
  getAllTags() {
    this._HelperService.allTags().subscribe({
      next: (res) => {
        this.tags = res;
      }
    })
  }
  // Category
  getAllCategory() {
    this._HelperService.allCategry().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    })
  }

  // image
  onSelect(event: any) {
    this.imgSrc = event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
