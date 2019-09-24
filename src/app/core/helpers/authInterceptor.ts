import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err, caught: Observable<HttpEvent<any>>) => {
          console.log("dddd")
          if (err instanceof HttpErrorResponse && err.status == 401) {
            // this.router.navigate(['login'], { queryParams: { returnUrl: req.url } });
            this.router.navigate(['/login']);
            return of(err as any);
          }else if(err instanceof HttpHeaderResponse && err.status == 200) {
            console.log("err",err)
          }
          throw err;
        })
      );
  }
}