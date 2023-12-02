import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IٌRecipe } from 'src/app/admin/recipes/models/Recipe';

@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.scss']
})
export class RecipeDataComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecipeDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IٌRecipe) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
