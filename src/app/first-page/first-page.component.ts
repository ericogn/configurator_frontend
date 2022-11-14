import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BlowerType } from '../models/blowertype.model';
import { Module } from '../models/module.model';
import { Tonnage } from '../models/tonnage.model';
import { Voltage } from '../models/voltage.model';
import { DigitalScrollComp } from '../models/digitalscrollcomp.model';
import { Router } from '@angular/router';
import { GetFunctionsService } from '../services/getfunctions.service';
import { EvapAirPath } from '../models/evapairpath.model';
import { Page1 } from '../models/page1.model';
import { PostFunctionService } from '../services/postfunctions.service';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { Page3 } from '../models/page3.model';
import { ThirdPageComponent } from '../third-page/third-page.component';
import { SecondPageComponent } from '../second-page/second-page.component';
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})

export class FirstPageComponent implements OnInit {

  constructor(private router:Router, public service:GetFunctionsService, private postservice:PostFunctionService) { }
  ngOnInit(): void {
    this.service.getVoltage().subscribe(data => this.voltage = data);
    this.service.getTonnage().subscribe(data => this.tonnage = data);
    //this.service.getModule().subscribe(data => this.module = data);
    this.service.getBlowerType().subscribe(data => this.blower = data);
    this.service.getEvapAirPath().subscribe(data => this.evapair = data);
    this.service.getDigitalScrollComp().subscribe(data => this.scroll = data);

    this.service.getPage1(this.service.id).subscribe(data => this.page1 = data);
    this.service.getPage1(this.service.id).subscribe(data => this.service.project.p1 = data);
    //this.initializemodule();
    this.init();

    console.log('page1');
  }
  init(){
    if(this.page1.basemodel == 1){
      this.basemodel = true;
    }else (this.basemodel = false);
    //this.initializemodule();
  }
  moduleSave(event:Event){
    this.page1.module = (event.target as HTMLSelectElement).value;
  }
  m1:Module[]=[
    {
      name:"Please Select",
      price: 0
    },
    {
      name:"Single - Left Hand",
      price: 0
    },
    {
      name:"Single - Right Hand",
      price: 0
    }
  ]
  m2: Module[]=[
    {
      name:"Please Select",
      price: 0
    },
    {
      name:"Double - Left Hand",
      price: 0
    },
    {
      name:"Double -Right Hand",
      price: 0
    },
  ]
  tonnage:Tonnage[]=[];
  voltage:Voltage[]=[];
  module:Module[]=this.m1;
  blower:BlowerType[]=[];
  evapair:EvapAirPath[]=[];
  scroll:DigitalScrollComp[]=[];
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
  };
  public visible1:boolean=false;
  
  public basemodel:boolean = false;

  isHidden: boolean = false;
  pic1:boolean=false;
  pic2:boolean=false;
  pic3:boolean=false;

  checkbool:boolean=false;
  
  unitA:Page3={
    tons:'',
    totalcooling:'',
    sensiblecooling:'',
    latdb:'',
    latwb:'',
    evapfan:'',
    evapmotor:'',
    mincfm:'',
  }

  unitB:Page3={
    tons:'',
    totalcooling:'',
    sensiblecooling:'',
    latdb:'',
    latwb:'',
    evapfan:'',
    evapmotor:'',
    mincfm:'',
  }


  changebasemodel(){
    if(this.page1.basemodel == 1){
      this.page1.basemodel = 0;
      this.basemodel = false;
      console.log('false');
    }
    else if (this.page1.basemodel == 0){
      this.page1.basemodel = 1;
      this.basemodel = true;
      console.log('true');
    }
  }

  ngInit(){
    if(this.page1.basemodel == 1){
      this.basemodel = true;
    }else this.basemodel = false;
    //this.service.getPage1(this.service.id).subscribe(data => this.page1 = data);
  }

  modulechange(event:Event){
    this.page1.tonnage = (event.target as HTMLSelectElement).value;
    this.service.project.p1. tonnage = (event.target as HTMLSelectElement).value;
    //this.initializemodule();
    for(let i = 0;i<this.tonnage.length; i++){
      if ((event.target as HTMLSelectElement).value == '15' ||
      (event.target as HTMLSelectElement).value == '20' ||
      (event.target as HTMLSelectElement).value == '25' ||
      (event.target as HTMLSelectElement).value == '30' ||
      (event.target as HTMLSelectElement).value == 'Please Select'
      ){
        this.module = this.m1;
      }
      else{
        this.module = this.m2;
      }
    }
    //this.thirdpage.init();

    console.log('service');
    // this.postservice.updatePage1(this.page1, this.service.id).subscribe(data => this.page1 = data);
    // this.postservice.updatePage1(this.service.project.p1, this.service.id).subscribe(data => this.service.project.p1 = data);
    //this.service.getPage1(this.service.id).subscribe(data=>this.page1= data);
    //this.updatePage1();
  }
  
  
  initializemodule(){
    if(this.service.project.p1.tonnage == '15' || this.service.project.p1.tonnage == '20' || this.service.project.p1.tonnage == '25' || this.service.project.p1.tonnage == '30' || this.service.project.p1.tonnage == 'Please Select'){
      this.module = this.m1;
    }
    else this.module = this.m2; 
  }

  blowerchange(event:Event){
    for(let i = 0;i<this.blower.length; i++){
      if ((event.target as HTMLSelectElement).value == this.blower[i].name.toString()){
        if(i==2){
          this.checkbool=true;
        }
        else{
          this.checkbool=false;
        }
      }
    }
  }  

  change(event:Event){
    for(let i = 0;i<this.evapair.length; i++){
      if ((event.target as HTMLSelectElement).value == this.evapair[i].name.toString()){
       if(i==0){
        this.pic1=false;
        this.pic2=false;
        this.pic3=false;
       }
       else if (i==1){
        this.pic1=true;
        this.pic2=false;
        this.pic3=false;
       }
       else if (i==2){
        this.pic1=false;
        this.pic2=true;
        this.pic3=false;
       }
       else if(i==3){
        this.pic1=false;
        this.pic2=false;
        this.pic3=true;
       }
      }
    }
  }


  nextpage(){
    this.router.navigateByUrl('secondpage');
  }

  test(){
    console.log(this.page1.module);
    console.log(this.module);
  }
  savepage1(){
    this.service.project.p1 = this.page1;
  }
  checkForFill(){
    if(this.service.project.p1.tonnage == 'Please Select' || this.page1.tonnage == 'Please Select'){
      return false;
    }
    return true;
  }
  updatePage1(){
    if(this.page1.quantity == 0){
      this.page1.quantity = 1;
      this.service.project.p1.quantity = 1;
      alert('Quantity must be at least one');
    }
    this.postservice.updatePage1(this.page1, this.service.id).subscribe(data => this.page1 = data);
    this.postservice.updatePage1(this.service.project.p1, this.service.id).subscribe(data => this.service.project.p1 = data);
    //this.postservice.updatePage1(this.page1,this.service.id).subscribe(data => this.page1 = data);
    //this.postservice.updatePage1(this.service.project.p1,this.service.id).subscribe(data => this.service.project.p1 = data);
    // this.ngOnInit();
  }
}
