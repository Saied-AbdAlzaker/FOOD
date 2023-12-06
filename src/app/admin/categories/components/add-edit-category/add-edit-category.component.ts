import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ICategory, ICategoryTable } from '../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  categoryName: string = '';
  categoryId: any;
  categoryData: ICategory | any;
  isUpdatePage: boolean = false;

  // pageSize: number = 10;
  // pageNumber: number | undefined = 1;
  // tableResponse: ICategoryTable | undefined;
  // tableData: ICategory[] = [];

  searchValue: string = '';

  constructor(public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _ActivatedRoute: ActivatedRoute,
    private _CategoryService: CategoryService,
    private _toastrService: ToastrService,
    private _router: Router) {

    this.categoryName = data.categoryName || '' ;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
