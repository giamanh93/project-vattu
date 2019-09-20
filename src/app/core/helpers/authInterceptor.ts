import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(request.body == null) {
          this.router.navigate(['/login'])
      }
    return next.handle(request)
      .pipe(
        catchError((err, caught: Observable<HttpEvent<any>>) => {
            console.log(err)
        //   if (err instanceof HttpErrorResponse && err.status == 401) {
        //     this.router.navigate(['login'], { queryParams: { returnUrl: req.url } });
        //     return of(err as any);
        //   }
          throw err;
        })
      );
  }
}