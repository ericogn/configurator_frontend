import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirstPageComponent } from '../first-page/first-page.component';
import { Page1 } from '../models/page1.model';
import { Page3 } from '../models/page3.model';
import { Page4 } from '../models/page4.model';
import { Performances } from '../models/unitperformances.model';
import { SecondPageComponent } from '../second-page/second-page.component';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss']
})
export class ThirdPageComponent implements OnInit {
  @ViewChild(FirstPageComponent) firstpage:FirstPageComponent = new FirstPageComponent(this.router, this.service, this.postservice);
  constructor(private router:Router, public service:GetFunctionsService, private postservice:PostFunctionService) { }
  ngOnInit(): void { 
   this.service.getPage1(this.service.id).subscribe(dt=> this.page1 = dt);
   this.service.getpage3(15).subscribe(dt=>this.unitA15 = dt);
   this.service.getpage3(20).subscribe(dt=>this.unitA20 = dt);
   this.service.getpage3(25).subscribe(dt=>this.unitA25 = dt);
   this.service.getpage3(30).subscribe(dt=>this.unitA30 = dt);
   this.service.getpage3(40).subscribe(dt=>this.unitA40 = dt);
   this.service.getpage3(50).subscribe(dt=>this.unitA50 = dt);
   this.service.getpage3(60).subscribe(dt=>this.unitA60 = dt);
   this.service.getpage3(70).subscribe(dt=>this.unitA70 = dt);
   this.service.getpage3(80).subscribe(dt=>this.unitA80 = dt);
   this.service.getpage3(90).subscribe(dt=>this.unitA90 = dt);
  }
  init(){
    this.service.getPage1(this.service.id).subscribe(dt=> this.page1 = dt);
    this.prev = false;
    this.curr = true;
    this.next = false;
  }
  page1:Page1={
    quantity:0,
    unittag:'',
    basemodel:0,
    producttype:'',
    tonnage:'',
    voltage:'',
    module:'',
    blowertype:'',
    evapairpath:'',
    digitalscrollcomp:''
  }
  tons:string = '';
  totalcooling:string='';
  sensiblecooling:string='';
  latdb:string='';
  latwb:string='';
  evapfan:string='';
  evapmotor:string='';
  mincfm:string='';

  tons1:string = '';
  totalcooling1:string='';
  sensiblecooling1:string='';
  latdb1:string='';
  latwb1:string='';
  evapfan1:string='';
  evapmotor1:string='';
  mincfm1:string='';

  unitA15:Page3={
    tons:'15',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA20:Page3={
    tons:'20',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA25:Page3={
    tons:'25',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA30:Page3={
    tons:'30',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA40:Page3={
    tons:'40',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA50:Page3={
    tons:'50',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA60:Page3={
    tons:'60',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA70:Page3={
    tons:'70',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA80:Page3={
    tons:'80',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }

  unitA90:Page3={
    tons:'90',
    totalcooling:'4',
    sensiblecooling:'4',
    latdb:'4',
    latwb:'4',
    evapfan:'4',
    evapmotor:'4',
    mincfm:'4',
  }
  
  prevPage(){
    this.router.navigateByUrl('secondpage');
  }

  nextPage(){
    this.router.navigateByUrl('fourthpage');
  }

  updatePage3(){
    switch (this.page1.tonnage) 
    {
      case '15' :
        if(this.prev == true){
          this.page1.tonnage = '15';
         // this.firstpage.page1.tonnage = '15';
        }
        if(this.next == true){
          this.page1.tonnage = '20';
         // this.firstpage.page1.tonnage = '20';
        }
      break;
      case '20' :
        if(this.prev == true){
          this.page1.tonnage = '15';
          this.service.project.p1.tonnage = '15';
          console.log(this.page1.tonnage);
         // this.firstpage.page1.tonnage = '15';
        }
        if(this.next == true){
          this.page1.tonnage = '25';
          this.service.project.p1.tonnage = '25';
          console.log(this.page1.tonnage);
         // this.firstpage.page1.tonnage = '25';
        }
      break;
      case '25' :
        if(this.prev == true){
          this.page1.tonnage = '20';
         // this.firstpage.page1.tonnage = '20';
        }
        if(this.next == true){
          this.page1.tonnage = '30';
        //  this.firstpage.page1.tonnage = '30';
        }
      break;
      case '30' :
        if(this.prev == true){
          this.page1.tonnage = '25';
         // this.firstpage.page1.tonnage = '25';
        }
        if(this.next == true){
          this.page1.tonnage = '40';
         // this.firstpage.page1.tonnage = '40';
        }
      break;
      case '40' :
        if(this.prev == true){
          this.page1.tonnage = '30';
         // this.firstpage.page1.tonnage = '30';
        }
        if(this.next == true){
          this.page1.tonnage = '50';
        //  this.firstpage.page1.tonnage = '50';
        }
      break;
      case '50' :
        if(this.prev == true){
          this.page1.tonnage = '40';
         // this.firstpage.page1.tonnage = '40';
        }
        if(this.next == true){
          this.page1.tonnage = '60';
         // this.firstpage.page1.tonnage = '60';
        }
      break;
      case '60' :
        if(this.prev == true){
          this.page1.tonnage = '50';
         // this.firstpage.page1.tonnage = '50';
        }
        if(this.next == true){
          this.page1.tonnage = '70';
         // this.firstpage.page1.tonnage = '70';
        }
      break;
      case '70' :
        if(this.prev == true){
          this.page1.tonnage = '60';
         // this.firstpage.page1.tonnage = '60';
        }
        if(this.next == true){
          this.page1.tonnage = '80';
          //this.firstpage.page1.tonnage = '80';
        }
      break;
      case '80' :
        if(this.prev == true){
          this.page1.tonnage = '70';
          //this.firstpage.page1.tonnage = '70';
        }
        if(this.next == true){
          this.page1.tonnage = '90';
          //this.firstpage.page1.tonnage = '90';
        }
      break;
      case '90' :
        if(this.prev == true){
          this.page1.tonnage = '80';
         // this.firstpage.page1.tonnage = '80';
        }
        if(this.next == true){
          this.page1.tonnage = '90';
          //this.firstpage.page1.tonnage = '90';
        }
      break;
      default:
        console.log(this.page1.tonnage);
        break;
    }

    this.postservice.updatePage1(this.page1,this.service.id).subscribe(dt=>this.page1 = dt);
    //this.postservice.updatePage1(this.firstpage.page1,this.service.id).subscribe(dt=>this.firstpage.page1 = dt);
    //console.log(this.page1);
    this.service.project.p1 = this.page1;
    
    // console.log(this.service.project.p1);
    // console.log(this.next);
   // console.log(this.firstpage.page1.tonnage);
   console.log('working');
  }
  test(){
    
  }

  prev:boolean = false;
  curr:boolean = true;
  next:boolean = false;

  radioprev(){
   this.prev = true;
   this.curr = false;
   this.next = false;
   console.log('prev');
  }
  radiocurr(){
    this.prev = false;
    this.curr = true;
    this.next = false;
    console.log('curr');
  }
  radionext(){
    this.prev = false;
    this.curr = false;
    this.next = true;
    console.log('next');
  }
}
