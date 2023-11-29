import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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

  recipesImage:any;
  recipesName:string='';
  tags:ITag[] = [];
  categories:ICategory[] = [];

  constructor(private _HelperService:HelperService,
              private _RecipesService:RecipesService,
              private _router:Router,
              private _toastrService:ToastrService) {}

  ngOnInit() {
    this.getAllTags();
    this.getAllCategories();
  }

  recipeForm = new FormGroup({
    name: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
    description: new FormControl(null),
  })

  onSubmit(data:FormGroup){
    let myData = new FormData();
    myData.append('name',data.value.name);
    myData.append('price',data.value.price);
    myData.append('tagId',data.value.tagId);
    myData.append('categoriesIds',data.value.categoriesIds);
    myData.append('description',data.value.description);
    myData.append('recipeImage',this.recipesImage,this.recipesImage.name);

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
  this.recipesImage = event.addedFiles[0];
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

}
