import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      const currentUser = this.authenticationService.currentUserValue;

      if(currentUser.profession === "admin"){
           return true;
      } else { 
        this.router.navigate(['/profile'],{queryParams : {returnUrl : state.url}});
          return false;
          
      }
  }
}
