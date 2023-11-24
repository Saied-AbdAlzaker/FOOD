import { Component, OnInit } from '@angular/core';

// interface IMenu{
//   title:string,
//   icon:string,
//   link:string,
//   isActive:boolean
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() { }

  // menu: IMenu[] = [
  //   {
  //     title: 'Home',
  //     icon: 'string',
  //     link: 'string',
  //     isActive: true
  //   },
  //   {
  //     title: 'Users',
  //     icon: 'string',
  //     link: 'string',
  //     isActive: true
  //   },
  //   {
  //     title: 'Recipes',
  //     icon: 'string',
  //     link: 'string',
  //     isActive: true
  //   },
  //   {
  //     title: 'Categories',
  //     icon: 'string',
  //     link: 'string',
  //     isActive: true
  //   }
  // ]

  ngOnInit() {
  }

}
