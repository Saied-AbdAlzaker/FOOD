import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ICategory, ICategoryTable } from '../../models/category';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewCategoryComponent>) {}

  pageSize:number=10;
  pageNumber:number | undefined = 1;
  tableResponse:ICategoryTable | undefined;
  tableData:ICategory[] | undefined = [];

  categoryName:string='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
