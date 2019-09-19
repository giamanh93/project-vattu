import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private dataService:  DataService,
    private router: Router
  ) { }

  intercept(request: any, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.body == null) {
      this.router.navigate(['/login'])
    }
    return next.handle(request);
  }
}
