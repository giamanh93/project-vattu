import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quanlyvattu';
  hideMenuTopLeft: any
  constructor(
    private router: Router,
    private dataService: DataService,
  ) {
      this.hideMenuTopLeft = true
  }
  ngOnInit() {
    this.hideMenuTopLeft = localStorage.getItem("hideMenuTopLeft")

    // localStorage.getItem()
    // this.dataService.infoUser().subscribe((res: any) => {
    //   console.log(res)
    //   if(res.error == 0) {
    //     console.log("dddddddd")
    //     this.hideMenuTopLeft = false
    //   }else {
    //     this.hideMenuTopLeft = true
    //     this.router.navigate(["/login"])
    //   }
    // })
  }
}
