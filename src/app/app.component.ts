import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FOOD';
  // spinnerType: string;
  // spinnerName: string;

  constructor(private spinner: NgxSpinnerService) {

    // this.spinnerName = 'sp5';
    // // this.spinnerType = 'square-jelly-box';
    // this.spinnerType = 'ball-scale-multiple';

  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
