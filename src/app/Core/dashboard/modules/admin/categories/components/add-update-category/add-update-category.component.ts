import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../model/categories';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.scss']
})
export class AddUpdateCategoryComponent {

  categoryName: string ;

  constructor(public dialogRef: MatDialogRef<AddUpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.categoryName = data.name ;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
