import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { toastPayload, CommonService } from 'src/app/common/common.service';
import { UserView } from 'src/app/pages/pages-login/user';
import { UserService } from 'src/app/pages/pages-login/user.service';
import { PMService } from '../../../pm.services';

@Component({
  selector: 'app-login-kpi-data',
  templateUrl: './login-kpi-data.component.html',
  styleUrls: ['./login-kpi-data.component.css']
})
export class LoginKpiDataComponent implements OnInit{

  toast!: toastPayload;
  loginForm !: FormGroup
  user!: UserView
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private userService: UserService, 
    private toastr:CommonService,
    private pmService: PMService  
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      password: ['', Validators.required],
      kpiId: []

    });
  }

  login() {
    if (this.loginForm.valid) {
      this.pmService.LoginToKpi(this.loginForm.value.password.toString()).subscribe({
        next: (res) => {
          console.log('res: ', res);
          sessionStorage.setItem('Kpi_token', res.Data);
          //this.router.navigateByUrl('/addkpidata/:kpiId');
          this.router.navigate(['/addkpidata', res.Data]);
       
        },
        error: (err) => {
          if (err.status == 400){
            
            this.toast = {
              message: 'Incorrect Access code',
              title: 'Authentication failed.',
              type: 'error',
              ic: {
                timeOut: 2500,
                closeButton: true,
              } as IndividualConfig,
            };
            this.toastr.showToast(this.toast);
  
          }
         
        }
      })
    }
  }

}


export class KpiAuthGuard implements CanActivate {

  constructor(private router: Router, private service: UserService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('Kpi_token') != null && sessionStorage.getItem('Kpi_token') != "") {
      
      return true;
    }
    else {
      this.router.navigate(['loginKpi/:kpiId']);
      return false;
    }

  }
  kpiLogout() {
    sessionStorage.setItem('Kpi_token', "")
    window.location.reload()
  }

}