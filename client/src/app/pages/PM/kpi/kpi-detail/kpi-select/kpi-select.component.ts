import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kpi-select',
  templateUrl: './kpi-select.component.html',
  styleUrls: ['./kpi-select.component.css']
})
export class KpiSelectComponent implements OnInit {
  kpiId!: string

  constructor(
    
    private activatedROute: ActivatedRoute,
    
 ){}

  ngOnInit(): void {
    
  }
}
