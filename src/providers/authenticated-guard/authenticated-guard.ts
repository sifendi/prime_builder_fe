import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router,private _cookieService:CookieService) {

    }
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
        if(loginFlagToken){
             return true;
        }else{
             this.router.navigate(['/login', {}]);
             return false;
        }
       
    }
}