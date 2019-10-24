import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DataService } from 'src/app/core/services';
import { ExportFileService } from 'src/app/core/export-file.service';
declare var $: any
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
  page: any;
  constructor(
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private dataService: DataService,
    private fileService: ExportFileService
  ) {
    this.page = 1;
  }

  ngOnInit() {
    this.getListProduction();
    this.getListOrder(null, this.page);
  }

  loadPage(event) {
    this.getListOrder(null, event);
  }

  getListOrder(key, pages) {
    this.tongtien = 0;
    this.dataService
      .listOrder<any[]>(key, pages)
      .subscribe((data: any) => this.listOrders = data.list,
        error => () => {
        },
        () => {
          if (this.listOrders && this.listOrders.lists.length > 0) {
            this.listOrders.lists.forEach(element => {
              element.items.forEach(item => {
                this.listProduction.list.forEach(product => {
                  if (item.production_id === product._id) {
                    item.name = product.name;
                  }
                });
              });
              this.tongtien += parseInt(element.total);
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
    const key = event.target.value;
    this.getListOrder(key, this.page);
  }

  exportExcel() {
    this.dataService
      .listOrder<any[]>(null, this.page)
      .subscribe((data: any) => {
        let excels = []
        data.list.lists.forEach(ele => {
          let res = {}
          res['Họ và tên']= ele.customer_name;
          res['Số điện thoại']= ele.customer_phone;
          res['Số điện thoại']= ele.customer_phone;
          res['Tổng tiền'] = ele.total;
          res['Địa chỉ'] = ele.customer_address;
          res['sản phẩm']='';
          ele.items.forEach(item => {
            this.listProduction.list.forEach(product => {
              if (item.production_id === product._id) {
                res['sản phẩm'] += product.name + ',';
              }
            });
          });
          excels.push(res);
        })
        excels = [...excels, {'Tổng giá': data.list.total}]
        this.fileService.exportAsExcelFile(excels, 'Dự thu ' + '20/10/2019');
      },
        error => () => {
        });
  }
}
