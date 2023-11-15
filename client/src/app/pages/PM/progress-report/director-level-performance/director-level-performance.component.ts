import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { PMService } from '../../pm.services';

@Component({
  selector: 'app-director-level-performance',
  templateUrl: './director-level-performance.component.html',
  styleUrls: ['./director-level-performance.component.css']
})
export class DirectorLevelPerformanceComponent implements OnInit {

  data: TreeNode[] = [
   
  ];

  constructor(private pmService : PMService){

  }
  ngOnInit(): void {
    
    this.getOrganizationList()
  }

  getOrganizationList(){

    
    this.pmService.getDirectorLevelPerformance().subscribe({
      next:(res)=>{

        
        this.data=res
      },error:(err=>{
        console.log(err)
      })
    })
  }

}
