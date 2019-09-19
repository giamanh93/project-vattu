import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/core/services';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
   
  }

  logout() {
    this.dataService.infologout().subscribe((res: any) => {
      if(res.error == 0) {
        this.router.navigate(['/login'])
      }
    })
  }
}
