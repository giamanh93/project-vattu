import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SlideBarComponent } from './pages/slide-bar/slide-bar.component';
import { HeaderComponent } from './pages/header/header.component';
import { Man11Component } from './pages/man11/man11.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './pages/footer/footer.component';
import { TaodonhangComponent } from './pages/taodonhang/taodonhang.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerInfoComponent } from './pages/customer-info/customer-info.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './pages/modal/modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Configuration } from './app.constants';
import { TaosanphamComponent } from './pages/taosanpham/taosanpham.component';
import { DetailOrderComponent } from './pages/detail-order/detail-order.component';
import { CurrencyDirective } from './core/directive/currency.directive';
import { CurrencyPipe } from '@angular/common';
import { AuthInterceptor } from './core/helpers/authInterceptor';
import { LoginAuthGuard } from './core/services/login-auth.guard';
import { ExportFileService } from './core/export-file.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    SlideBarComponent,
    HeaderComponent,
    Man11Component,
    TaodonhangComponent,
    CustomerInfoComponent,
    ModalComponent,
    TaosanphamComponent,
    DetailOrderComponent,
    CurrencyDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  entryComponents: [ModalComponent],
  providers: [Configuration, CurrencyPipe, LoginAuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },ExportFileService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
