import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sheard',
  templateUrl: './sheard.component.html',
  styleUrls: ['./sheard.component.scss']
})
export class SheardComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

}
