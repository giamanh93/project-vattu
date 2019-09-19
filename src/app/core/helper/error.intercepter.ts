import { Router } from '@angular/router';
// import { NotificationService } from './../services/notification.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthenticationService } from '../services/authentication.service';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
// import { EnvConfigService } from 'app/env-config.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        // private authenticationService: AuthenticationService,
        // private notificationService: NotificationService,
        private router: Router,
        // private envConfigService: EnvConfigService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log("ffff")
            console.log("ffff", err)
            if (err.status == 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                // https://pdr.ecomedic.vn/api/me/notice/count/
                this.router.navigate([`/login`]);
            }
            // if (err.status == 500) {
            //     this.notificationService.showNotification(err.error.detail, 2);
            // }
            // if (err.status == 403 || err.status == 404) {
            //     this.router.navigate(['manage/no-page'])
            // }
            // if (err.status == 404) {
            //     this.notificationService.showNotification(err.error.detail, 2);
            // }

            // const error = err.error.message || err.statusText;
            return throwError(err);
        }))
    }
}