import { Component, OnInit, Input } from '@angular/core';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.css']
})
export class EditjobComponent implements OnInit {

  @Input() jobdataid: String;
  constructor() { 
   // debugger
    
  }
  
  ngOnInit() {
    
  }
  ngOnChanges(): void {
    //debugger
    console.log("Parent jobID:", this.jobdataid);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }

}
