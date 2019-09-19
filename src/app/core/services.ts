import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Configuration } from '../app.constants';
@Injectable({
    providedIn: 'root'
})
export class DataService {
    private actionUrl: string;
    constructor(private http: HttpClient, private configuration: Configuration) {
        this.actionUrl = configuration.serverWithApiUrl;
    }

    public add<T>(params): Observable<T> {
        return this.http.post<T>(this.actionUrl + 'customer', params);
    }
    public list<T>(): Observable<T> {
        return this.http.get<T>(this.actionUrl + 'customer');
    }
    
    public update<T>(id: string, params: any): Observable<T> {
        return this.http
            .put<T>(this.actionUrl + 'customer/' + id, params);
    }
    public delete<T>(id: string): Observable<T> {
        return this.http.delete<T>(this.actionUrl + 'customer/' + id);
    }

    public addProduction<T>(params): Observable<T> {
        return this.http.post<T>(this.actionUrl + 'production-type', params);
    }
    public listProduction<T>(): Observable<T> {
        return this.http.get<T>(this.actionUrl + 'production-type');
    }
    public updateProduction<T>(id: string, params: any): Observable<T> {
        return this.http
            .put<T>(this.actionUrl + 'production-type/' + id, params);
    }
    public deleteProduction<T>(id: string): Observable<T> {
        return this.http.delete<T>(this.actionUrl + 'production-type/' + id);
    }

    public infoOrder<T>(id): Observable<T> {
        return this.http.get<T>(this.actionUrl  + 'order/' + id);
    }
    public addOrder<T>(params): Observable<T> {
        return this.http.post<T>(this.actionUrl + 'order', params);
    }
    // public listOrder<T>(key: string): Observable<T> {
    //     return this.http.get<T>(this.actionUrl + 'order' + `?key=${key ? key : null}`);
    // }
    public listOrder<T>(key: string): Observable<T> {
        return this.http.get<T>(this.actionUrl + 'order' + `?key=${key ? key : null}`);
    }
    public updateOrder<T>(id: string, params: any): Observable<T> {
        return this.http
            .put<T>(this.actionUrl + 'order/' + id, params);
    }
    public deleteOrder<T>(id: string): Observable<T> {
        return this.http.delete<T>(this.actionUrl + 'order/' + id);
    }

    public infoItem<T>(id): Observable<T> {
        return this.http.get<T>(this.actionUrl  + 'item/' + id);
    }
    public addItem<T>(params): Observable<T> {
        return this.http.post<T>(this.actionUrl + 'item', params);
    }
    public listItem<T>(): Observable<T> {
        return this.http.get<T>(this.actionUrl + 'item');
    }
    public updateItem<T>(id: string, params: any): Observable<T> {
        return this.http
            .put<T>(this.actionUrl + 'item/' + id, params);
    }
    public deleteItem<T>(id: string): Observable<T> {
        return this.http.delete<T>(this.actionUrl + 'item/' + id);
    }
    public async deleteItems<T>(id: string){
        return await this.http.delete<T>(this.actionUrl + 'item/' + id).toPromise()
    };
    public infoUser<T>(): Observable<T> {
        return this.http.get<T>(this.actionUrl + 'user/info');
    }
    public login<T>(params): Observable<T> {
        return this.http.post<T>(this.actionUrl + 'user/login', params);
    }

}

    @Injectable()
    export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {
        if(!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    // req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
}
}