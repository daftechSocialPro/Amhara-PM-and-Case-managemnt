import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from '../../common/common.service';
import { UserView } from './user';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  toast!: toastPayload;
  loginForm !: FormGroup
  user!: UserView
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr:CommonService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res) => {
          sessionStorage.setItem('token', res.token);
          this.user = this.userService.getCurrentUser()
          console.log(this.user)
          this.router.navigateByUrl('/casedashboard');
        },
        error: (err) => {
          if (err.status == 400){
            
            this.toast = {
              message: 'Incorrect username or password',
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
