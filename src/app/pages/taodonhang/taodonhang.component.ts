import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms'
import { requiredInput } from 'src/app/core/common-helper/custom-validate.helper';
import { DataService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
declare var require: any
var numeral = require('numeral');

@Component({
  selector: 'app-taodonhang',
  templateUrl: './taodonhang.component.html',
  styleUrls: ['./taodonhang.component.css']
})
export class TaodonhangComponent implements OnInit {
  formProduct: FormGroup;
  items: FormArray;
  listCustomers: any;
  listProduction: any;
  resultSelectCustomer: any;
  resultSelectProduct: any;
  order_id: string;
  detailOrder: any;
  public model: any;
  removeList: any
  removeItem: any[]

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.removeItem = []
  }

  ngOnInit() {
    this.getListProduction();
    this.activatedRoute.queryParams.subscribe(res => {
      this.order_id = res.order_id;
      if (this.order_id) {
        this.getDetailOrderById(this.order_id)
      }
    })
    this.getListCustomer();
    this.buiformOrder()
  }
  buiformOrder() {
    this.formProduct = this.formBuilder.group({
      _id: [''],
      customer_name: ['', requiredInput],
      customer_address: ['', requiredInput],
      items: this.formBuilder.array([this.createProduct()]),
      customer_description: [''],
      customer_phone: ['', requiredInput],
      total: ['']
    })
  }
  getDetailOrderById(id) {
    this.dataService
      .infoOrder<any[]>(id)
      .subscribe((data: any) => this.detailOrder = data.info,
        error => () => {
        },
        () => {
          this.listProduction.list.forEach((element, index) => {
            this.detailOrder.items.forEach((element1, i) => {
              if (element1.production_id == element._id) {
                this.addProduct()
                this.formatterProduct(element1)
                element1.name = element.name;
              }
            });
          });

          if (this.detailOrder.items.length > 0 && (this.items && this.items.length > 1)) {
            this.items.removeAt(this.detailOrder.items.length - 1)
          }
          this.formatter(this.detailOrder)
          this.formProduct.patchValue(this.detailOrder)
        });

  }

  createProduct(): FormGroup {
    return this.formBuilder.group({
      _id: [''],
      production_id: [''],
      name: ['', requiredInput],
      dongia: ['', requiredInput],
      soluong: ['', requiredInput],
      thanhtien: ['']
    })
  }
  get f() { return this.formProduct.controls };
  get t() { return this.f.items as FormArray; }

  addProduct() {
    this.items = this.formProduct.get('items') as FormArray;
    this.items.push(this.createProduct())
  }

  submitForm() {
    let items = []
    let tongtien = 0;
    this.formProduct.value.items.forEach((element, i) => {
      items.push({
        production_id: element.name._id,
        dongia: element.dongia,
        soluong: element.soluong,
        thanhtien: element.thanhtien,
      })
      tongtien += parseInt(this.formProduct.value.items[i].thanhtien)
    });
    let paramCustomer = {
      customer_id: this.formProduct.value.customer_name._id ? this.formProduct.value.customer_name._id : this.formProduct.value._id,
      customer_name: this.formProduct.value.customer_name.name ? this.formProduct.value.customer_name.name : this.formProduct.value.customer_name,
      customer_phone: this.formProduct.value.customer_phone,
      customer_address: this.formProduct.value.customer_address,
      customer_description: this.formProduct.value.customer_description,
      total: tongtien,
    }
    let params = { ...paramCustomer, items: items }
    if (!this.order_id) {
      this.dataService
        .addOrder<any[]>(params)
        .subscribe((data: any[]) => console.log("Oke"),
          error => () => {
            console.log(error)
          },
          () => {
            this.router.navigate(['/home'])
            this.formProduct.reset();
          });
    } else {
      this.formProduct.value.items.forEach(e => {
        let param_update = {
          production_id: e.name._id ? e.name._id : e.production_id,
          dongia: e.dongia,
          soluong: e.soluong,
          thanhtien: e.thanhtien,
          order_id: this.order_id
        }
        if (e._id) {
          if ([...new Set(this.removeItem)] && [...new Set(this.removeItem)].length > 0) {
            // delete item
            [...new Set(this.removeItem)].forEach((id, idx) => {
              this.dataService
                .deleteItems<any[]>(id)
                .then((data: any[]) => {
                  console.log("delete")
                });
            })
          } else {
            // update item
            this.dataService
              .updateItem<any[]>(e._id, param_update)
              .subscribe((data: any[]) => console.log("Update"),
                error => () => {
                  console.log(error)
                },
                () => {
                });
          }
        } else {
          if ([...new Set(this.removeItem)] && [...new Set(this.removeItem)].length > 0) {
            // delete item
            [...new Set(this.removeItem)].forEach((id, idx) => {
              this.dataService
                .deleteItem<any[]>(id)
                .subscribe((data: any[]) => console.log("Delete"),
                  error => () => {
                    console.log(error)
                  },
                  () => {
                  });
            })
          }
          // create item
          this.dataService
            .addItem<any[]>(param_update)
            .subscribe((data: any[]) => console.log("Create Item"),
              error => () => {
                console.log(error)
              },
              () => {
                
              });
        }
      });
      this.dataService
        .updateOrder<any[]>(this.order_id, paramCustomer)
        .subscribe((data: any[]) => console.log("update order"),
          error => () => {
            console.log(error)
          },
          () => {
            this.router.navigate(['/home'])
          });
    }
  }
  
  deleteProduct(i, id) {
    if (this.items && this.items.length > 1) {
      this.items.removeAt(i)
      if (id) {
        this.removeItem.push(id)
      }

    }
  }

  calculatorProduct(i, dongia, soluong) {
    if (dongia && soluong) {
      let total = dongia * soluong;
      this.t.controls[i].get('thanhtien').setValue(total)
    }
  }

  formatter = (result) => result['name'] ? result['name'] : result;

  formatterProduct = (result: string) => result['name'] ? result['name'] : result;

  selectedItem(result) {
    this.resultSelectCustomer = result
    this.f.customer_address.setValue(result.item.address)
    this.f.customer_name.setValue(result.item.name)
    this.f.customer_phone.setValue(result.item.phone)
  };

  selectedProduct(result, i) {
    this.resultSelectProduct = result
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.listCustomers.list.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchProduct = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.listProduction.list.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  getListCustomer() {
    this.dataService
      .list<any[]>()
      .subscribe((data: any[]) => this.listCustomers = data,
        error => () => {
        },
        () => {
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

}
