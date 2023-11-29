import { HelperService } from './../../services/helper.service';
import { RecipesService } from './services/recipes.service';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ITag, IٌRecipe, IٌRecipeTable } from './models/Recipe';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

 

  constructor(private _RecipesService:RecipesService, 
    private _ToastrService:ToastrService,
    private _HelperService:HelperService) { }

  pageSize:number=10;
  pageNumber:number | undefined = 1;
  tableResponse:IٌRecipeTable | undefined;
  tableData:IٌRecipe[] | undefined = [];
  tags:ITag[] = [];
  tagId:any;
  categories:any;

  searchValue:string = '';

  ngOnInit() {
    this.getAllTags();
    this.getTableData();
  }

  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
      tagId: this.tagId
    }

    this._RecipesService.getRecipes(params).subscribe({
      next: (res) => {
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
        console.log(res);
        this.categories = res;
        
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

}