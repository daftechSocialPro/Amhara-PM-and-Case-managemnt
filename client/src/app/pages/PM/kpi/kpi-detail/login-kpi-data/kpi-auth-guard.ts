import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiAuthGuard implements CanActivate {

    constructor(private router: Router) {
    }
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (sessionStorage.getItem('Kpi_token') != null && sessionStorage.getItem('Kpi_token') != "") {
        
        return true;
      }
      else {
        this.router.navigate(['loginKpi']);
        return false;
      }
  
    }
    kpiLogout() {
      sessionStorage.setItem('Kpi_token', "")
      window.location.reload()
    }
  
  }