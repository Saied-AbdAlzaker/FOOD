import { IٌRecipe } from 'src/app/admin/recipes/models/Recipe';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { ICategory, ITag } from '../../models/Recipe';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})
export class AddEditRecipesComponent implements OnInit {

  imgSrc:any;
  recipesName:string='';
  tags:ITag[] = [];
  categories:ICategory[] = [];
  recipeId:any;
  recipeData: IٌRecipe | any;
  isUpdatePage:boolean = false;

  recipeForm = new FormGroup({
    name: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
    description: new FormControl(null),
  })

  constructor(private _HelperService:HelperService,
              private _RecipesService:RecipesService,
              private _router:Router,
              private _toastrService:ToastrService,
              private _ActivatedRoute:ActivatedRoute) {
                
                console.log(_ActivatedRoute.snapshot.params['id']);
                this.recipeId = _ActivatedRoute.snapshot.params['id'];
                if(this.recipeId){
                  this.isUpdatePage = true;
                  this.getRecipesById(this.recipeId);
                } else {
                  this.isUpdatePage = false
                }
              }

  ngOnInit() {
    this.getAllTags();
    this.getAllCategories();
  }

  onSubmit(data:FormGroup){
    let myData = new FormData();
    myData.append('name',data.value.name);
    myData.append('price',data.value.price);
    myData.append('tagId',data.value.tagId);
    myData.append('categoriesIds',data.value.categoriesIds);
    myData.append('description',data.value.description);
    myData.append('recipeImage',this.imgSrc,this.imgSrc.name);

    if(this.recipeId){
      // Update
      // this.editRecipes();
      this._RecipesService.editRecipes(myData,this.recipeId).subscribe({
        next: (res)=>{
          console.log(res);
        }, error: (err)=>{
          this._toastrService.success('Recipe Not Update', 'Ok');
        }, complete: ()=>{
          this._router.navigate(['/dashboard/admin/recipes'])
          this._toastrService.success('Recipe Update Successfully', 'Ok');
        }
      })
    } else{
      // Add
      // this.addRecipes();
      this._RecipesService.addRecipes(myData).subscribe({
        next: (res)=>{
          console.log(res);
        }, error: (err)=>{
          this._toastrService.success('Recipe Not Added', 'Ok');
        }, complete: ()=>{
          this._router.navigate(['/dashboard/admin/recipes'])
          this._toastrService.success('Recipe Add Successfully', 'Ok');
        }
      })
    }
  }

  // editRecipes(){
  //   let myData = new FormData();
  //   this._RecipesService.editRecipes(myData,this.recipeId).subscribe({
  //     next: (res)=>{
  //       console.log(res);
  //     }, error: (err)=>{
  //       this._toastrService.success('Recipe Not Update', 'Ok');
  //     }, complete: ()=>{
  //       this._router.navigate(['/dashboard/admin/recipes'])
  //       this._toastrService.success('Recipe Update Successfully', 'Ok');
  //     }
  //   })
  // }

  // addRecipes(){
  //   let myData = new FormData();
  //   this._RecipesService.addRecipes(myData).subscribe({
  //     next: (res)=>{
  //       console.log(res);
  //     }, error: (err)=>{
  //       this._toastrService.success('Recipe Not Added', 'Ok');
  //     }, complete: ()=>{
  //       this._router.navigate(['/dashboard/admin/recipes'])
  //       this._toastrService.success('Recipe Add Successfully', 'Ok');
  //     }
  //   })
  // }

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

  files: File[] = [];

onSelect(event:any) {
  this.imgSrc = event.addedFiles[0];
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

getRecipesById(id: number){
  this._RecipesService.getRecipeById(id).subscribe({
    next: (res)=>{
      console.log(res);
      this.recipeData = res;
    }, error: (err)=>{
      console.log(err);
    }, complete: ()=>{
      this.imgSrc = 'https://upskilling-egypt.com/' + this.recipeData.imagePath ;
      this.recipeForm.patchValue({
        name: this.recipeData?.name,
        price: this.recipeData?.price,
        tagId: this.recipeData?.tag.id,
        categoriesIds: this.recipeData?.category[0].id,
        description: this.recipeData?.description,
      })
    }
  })
}

}
