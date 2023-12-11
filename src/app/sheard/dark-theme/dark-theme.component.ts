import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from 'ngx-toastr';

@Component({
  selector: 'app-dark-theme',
  templateUrl: './dark-theme.component.html',
  styleUrls: ['./dark-theme.component.scss']
})
export class DarkThemeComponent implements OnInit {

  switchTheme = new FormControl(false);
  @HostBinding('class') className = '';
  lightClass = 'theme-light'
  darkClass = 'theme-dark'

  constructor(private overlay:OverlayContainer) { }

  ngOnInit() {
    this.switchTheme.valueChanges.subscribe((currentMode)=>{
      this.className = currentMode ? this.darkClass : this.lightClass

      if(currentMode){
        this.overlay.getContainerElement().classList.add(this.darkClass)
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClass)
      }
    })
  }

}
