import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrganizationService } from '../../common/organization/organization.service';
import { UserView } from '../../pages-login/user';
import { UserService } from '../../pages-login/user.service';
import { IPMDashboard } from '../pm.dashboard';

@Component({
  selector: 'app-pm-dashboard',
  templateUrl: './pm-dashboard.component.html',
  styleUrls: ['./pm-dashboard.component.css']
})
export class PmDashboardComponent implements OnInit {

  IPMDashboardDto!: IPMDashboard
  serachForm!: FormGroup
  user!: UserView
  basicData: any
  basicOptions: any

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.user = this.userService.getCurrentUser()

    this.orgService.GetPMBarchart(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.basicData = res
      }, error: (err) => {
        console.error(err)
      }
    })

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };


    this.getPMDashboardDto()
  }
  constructor(private orgService: OrganizationService, private userService: UserService) { }

  getPMDashboardDto() {
    this.orgService.getPmDashboardReport(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.IPMDashboardDto = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }


}
