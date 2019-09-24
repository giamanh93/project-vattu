import { Injectable } from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router"
import { DataService } from '../services';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class LoginAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private dataService: DataService
    ){}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        this.dataService.infoUser().subscribe((res: any) => {
            console.log(res)
            if(res.error == 0) {
                this.router.navigate(['/home'])
                return false
            }
        })
        return true
    }
}