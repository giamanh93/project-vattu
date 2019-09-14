import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup} from '@angular/forms'
import { DataService } from 'src/app/core/services';
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  formCustomer: FormGroup;
  listCustomers: any
  @ViewChild('modal', {static: false}) modal: any
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataService: DataService,

) { }

  ngOnInit() {
    this.formCustomer = this.formBuilder.group({
      name: [''],
      phone: [''],
      address: [''],
      description: ['']
    })
    this.getListCustomer();
  }
  getListCustomer() {
    this.dataService
            .list<any[]>()
            .subscribe((data: any[]) => this.listCustomers = data,
            error => () => {
            },
            () => {
            });
  }
  
  showModalCreateCustomer(i,id) {
    this.formCustomer.reset();
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'Tạo Khách Hàng';
    modalRef.componentInstance.form = this.formCustomer;
    if(id) {
      modalRef.componentInstance.dataEdit = this.listCustomers.list[i];
    }
    modalRef.componentInstance.arrForm = [{
      type: 'name',
      name: 'Họ Và Tên',
      key: 'input'
    },
    {
      type: 'address',
      name: 'Địa Chỉ',
      key: 'input'
    },
    {
      type: 'phone',
      name: 'Số Điện Thoại',
      key: 'input'
    },
    {
      type: 'description',
      name: 'Mô tả',
      key: 'textarea'
    }];
    modalRef.componentInstance.save.subscribe((receivedEntry) => {
      // console.log(receivedEntry);
      if(id) {
        this.dataService
            .update<any[]>(id, receivedEntry)
            .subscribe((data: any[]) => console.log("Oke"),
            error => () => {
                console.log(error)
            },
            () => {
              this.getListCustomer();
              this.formCustomer.reset();
            });
      
      }else {
        this.dataService
            .add<any[]>(receivedEntry)
            .subscribe((data: any[]) => console.log("Oke"),
            error => () => {
                console.log(error)
            },
            () => {
              this.getListCustomer();
              this.formCustomer.reset();
            });
      }
      })
  }
  onDelete(id) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'Xóa Thông Tin Khách Hàng';
    modalRef.componentInstance.content = 'Bạn muốn xóa thông tin khách hàng này không';
    modalRef.componentInstance.form = null;
    modalRef.componentInstance.submit.subscribe((receivedEntry) => {
      this.dataService
      .delete<any[]>(id)
      .subscribe((data: any[]) => console.log("DELETE Oke"),
      error => () => {
          console.log(error)
      },
      () => {
        this.getListCustomer();
        // this.formCustomer.reset();
      });
    })
    
  }
}
