import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quanlyvattu';
  hideMenuTopLeft: boolean
  constructor(
    private router: Router
  ) {
      this.hideMenuTopLeft = true
  }
  ngOnInit() {
    if(this.router.url == '/login' || window.location.pathname == '/login') {
      this.hideMenuTopLeft = true
    }else {
      console.log("dddd")
      this.hideMenuTopLeft = false
    }
  }
}
