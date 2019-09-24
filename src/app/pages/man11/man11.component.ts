import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DataService } from 'src/app/core/services';
declare var $:any
@Component({
  selector: 'app-man11',
  templateUrl: './man11.component.html',
  styleUrls: ['./man11.component.scss']
})
export class Man11Component implements OnInit {
  listOrders: any;
  listProduction: any;
  hideMenuTopLeft: any;
  tongtien: number;
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private dataService: DataService
    ) {
     }

  ngOnInit() {
    this.getListProduction();
      this.getListOrder(null);
  }

  getListOrder(key) {
    this.tongtien = 0;
    this.dataService
      .listOrder<any[]>(key)
      .subscribe((data: any[]) => this.listOrders = data,
        error => () => {
        },
        () => {
          console.log()
          if(this.listOrders.list && this.listOrders.list.length > 0) {
            this.listOrders.list.forEach(element => {
              element.items.forEach(item => {
                this.listProduction.list.forEach(product => {
                  if(item.production_id === product._id) {
                    item.name =product.name
                  }
                });
              });
              this.tongtien += parseInt(element.total)
            });
          }
        });
  }
  getListProduction() {
    this.dataService
            .listProduction<any[]>()
            .subscribe((data: any[]) => this.listProduction = data,
            error => () => {
            },
            () => {
            });
      
  }
  onChangeValueText(event) {
    const key = event.target.value
    this.getListOrder(key)
  }
}
