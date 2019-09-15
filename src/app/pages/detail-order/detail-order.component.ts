import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/services';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  order_id: string;
  detailOrder: any
  listProduction: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.order_id= res.order_id
      this.getListProduction()
      this.getDetailOrderById(this.order_id)
    })
  }
getDetailOrderById(id) {
    this.dataService
            .infoOrder<any[]>(id)
            .subscribe((data: any) => this.detailOrder = data.info,
            error => () => {
            },
            () => {
              this.listProduction.list.forEach(element => {
                this.detailOrder.items.forEach(element1 => {
                  if(element1.production_id == element._id) {
                    element1.name = element.name;
                  }
                });
                
              });
            });
      
  }
  getListProduction() {
    this.dataService
            .listProduction<any[]>()
            .subscribe((data: any) => this.listProduction = data,
            error => () => {
            },
            () => {
            });
      
  }
  removeOrder(order) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'Xóa Đơn Hàng';
    modalRef.componentInstance.content = 'Bạn muốn xóa thông tin đơn hàng này không';
    modalRef.componentInstance.form = null;
    modalRef.componentInstance.submit.subscribe((receivedEntry) => {
      order.items.forEach(item => {
        this.dataService
            .deleteItems<any[]>(item._id)
            .then((data: any) => {
              console.log("delete oke Item", data)
            });
      });
      this.dataService
            .deleteOrder<any[]>(order._id)
            .subscribe((data: any) => console.log("Delete order oke"),
            error => () => {
            },
            () => {
              this.router.navigate(['/home'])
            });

    })
    
  }
}
