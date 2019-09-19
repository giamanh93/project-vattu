import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup } from '@angular/forms'
import { DataService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-taosanpham',
  templateUrl: './taosanpham.component.html',
  styleUrls: ['./taosanpham.component.css']
})
export class TaosanphamComponent implements OnInit {
  formProduction: FormGroup;
  listProduction: any;
  page:any = 3
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formProduction = this.formBuilder.group({
      name: [''],
      production_code: ['']
    })
    this.getListProduction();
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
  showModalCreateProduction(i, id) {
    this.formProduction.reset();
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'Tạo Khách Hàng';
    modalRef.componentInstance.form = this.formProduction;
    if(id) {
      modalRef.componentInstance.dataEdit = this.listProduction.list[i];
    }
    modalRef.componentInstance.arrForm = [{
      type: 'name',
      name: 'Tên Sản Phẩm',
      key: 'input'
    },
    {
      type: 'production_code',
      name: 'Mã Đơn Hàng',
      key: 'input'
    },
    ];
    modalRef.componentInstance.save.subscribe((receivedEntry) => {
      if(id) {
        this.dataService
            .updateProduction<any[]>(id, receivedEntry)
            .subscribe((data: any[]) => console.log("Oke"),
            error => () => {
                console.log(error)
            },
            () => {
              this.getListProduction()
              this.formProduction.reset();
            });
      
      }else {
        this.dataService
            .addProduction<any[]>(receivedEntry)
            .subscribe((data: any[]) => console.log("Oke"),
            error => () => {
                console.log(error)
            },
            () => {
              this.getListProduction()
              this.formProduction.reset();
            });
      }
      })
  }
  onDelete(id) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'Xóa Thông Tin Sản Phẩm';
    modalRef.componentInstance.content = 'Bạn muốn xóa thông tin Sản Phẩm này không';
    modalRef.componentInstance.form = null;
    modalRef.componentInstance.submit.subscribe((receivedEntry) => {
      this.dataService
      .deleteProduction<any[]>(id)
      .subscribe((data: any[]) => console.log("DELETE Oke"),
      error => () => {
          console.log(error)
      },
      () => {
        this.getListProduction();
        // this.formCustomer.reset();
      });
    })
    
  }
}
