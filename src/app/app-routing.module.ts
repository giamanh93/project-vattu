import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Man11Component } from './pages/man11/man11.component';
import { TaodonhangComponent } from './pages/taodonhang/taodonhang.component';
import { CustomerInfoComponent } from './pages/customer-info/customer-info.component';
import { TaosanphamComponent } from './pages/taosanpham/taosanpham.component';
import { DetailOrderComponent } from './pages/detail-order/detail-order.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: Man11Component
  },
  {
    path: 'taodonhang',
    component: TaodonhangComponent
  },
  {
    path: 'danhsachkhachhang',
    component: CustomerInfoComponent
  },
  {
    path: 'taokhachhang',
    component: CustomerInfoComponent
  },
  {
    path: 'taosanpham',
    component: TaosanphamComponent
  },
  {
    path: 'chitiethoadon',
    component: DetailOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
