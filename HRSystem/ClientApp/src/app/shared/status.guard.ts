import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StatusService } from './status.service';

@Injectable({
  providedIn: 'root'
})
export class StatusGuard implements CanActivate {
  constructor(private statusService: StatusService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.statusService.getStatus().pipe(
        map((status) => {
          if (status == '') {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      );
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class NotSubmittedStatusGuard implements CanActivate {
  constructor(private statusService: StatusService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.statusService.getStatus().pipe(
        map((status) => {
          if (status == 'HRStatus') {
            this.router.navigate(['/HRhome']);
            return false;
          }
          if (status !== 'Open') {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      );
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class ApprovedStatusGuard implements CanActivate {
  constructor(private statusService: StatusService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.statusService.getStatus().pipe(
        map((status) => {
          if (status == 'HRStatus') {
            this.router.navigate(['/HRhome']);
            return false;
          }
          if (status !== 'Completed') {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      );
  }
  
}