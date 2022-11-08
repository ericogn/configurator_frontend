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
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})

export class FirstPageComponent implements OnInit {

  constructor(private router:Router, private service:GetFunctionsService, private postservice:PostFunctionService) { }
  ngOnInit(): void {
    this.service.getVoltage().subscribe(data => this.voltage = data);
    this.service.getTonnage().subscribe(data => this.tonnage = data);
    //this.service.getModule().subscribe(data => this.module = data);
    this.service.getBlowerType().subscribe(data => this.blower = data);
    this.service.getEvapAirPath().subscribe(data => this.evapair = data);
    this.service.getDigitalScrollComp().subscribe(data => this.scroll = data);

    this.service.getPage1(this.service.id).subscribe(data => this.page1 = data);
    this.initializemodule();
    this.init();

    console.log('page1');
  }
  init(){
    if(this.page1.basemodel == 1){
      this.basemodel = true;
    }else (this.basemodel = false);
    this.unitcode(this.page1.tonnage);
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

  public unitcode(tonnage:string){
    switch(tonnage){
      case '15':{
        this.service.getPage3(15).subscribe(data => this.unitA = data);
        this.service.getPage3(20).subscribe(data => this.unitB = data);
        break;
      }
      case '20':{
        this.service.getPage3(15).subscribe(data => this.unitA = data);
        this.service.getPage3(25).subscribe(data => this.unitB = data);
        break
      }
      case '25':{
        this.service.getPage3(20).subscribe(data => this.unitA = data);
        this.service.getPage3(30).subscribe(data => this.unitB = data);
        break
      }
      case '30':{
        this.service.getPage3(25).subscribe(data => this.unitA = data);
        this.service.getPage3(40).subscribe(data => this.unitB = data);
        break
      }
      case '40':{
        this.service.getPage3(30).subscribe(data => this.unitA = data);
        this.service.getPage3(50).subscribe(data => this.unitB = data);
        break
      }
      case '50':{
        this.service.getPage3(40).subscribe(data => this.unitA = data);
        this.service.getPage3(60).subscribe(data => this.unitB = data);
        break
      }
      case '60':{
        this.service.getPage3(50).subscribe(data => this.unitA = data);
        this.service.getPage3(70).subscribe(data => this.unitB = data);
        break
      }
      case '70':{
        this.service.getPage3(60).subscribe(data => this.unitA = data);
        this.service.getPage3(80).subscribe(data => this.unitB = data);
        break
      }
      case '80':{
        this.service.getPage3(70).subscribe(data => this.unitA = data);
        this.service.getPage3(90).subscribe(data => this.unitB = data);
        break
      }
      case '90':{
        this.service.getPage3(80).subscribe(data => this.unitA = data);
        this.service.getPage3(90).subscribe(data => this.unitB = data);
        break
      }
    }

    console.log(this.unitA);
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
    this.unitcode((event.target as HTMLSelectElement).value);
    //this.thirdpage.init();

    console.log('service');
    this.postservice.updatePage1(this.page1, this.service.id).subscribe(data => this.page1 = data);
    //this.service.getPage1(this.service.id).subscribe(data=>this.page1= data);
    //this.updatePage1();
  }
  
  
  initializemodule(){
    if(this.page1.tonnage == '15' || this.page1.tonnage == '20' || this.page1.tonnage == '25' || this.page1.tonnage == '30' || this.page1.tonnage == 'Please Select'){
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
    console.log(this.page1);
    this.updatePage1();
    
    console.log('test');
  }

  updatePage1(){
    this.postservice.updatePage1(this.page1,this.service.id).subscribe(data => this.page1 = data);
    // this.ngOnInit();
  }
}
