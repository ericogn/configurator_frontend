import { style } from '@angular/animations';
import { DecimalPipe } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, Directive, ElementRef, HostListener, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirSideEconomizer } from '../models/airsideeconomizer.model';
import { Autoloader } from '../models/autoloader.model';
import { EvapFilterType } from '../models/evapfiltertype.model';
import { FluidType } from '../models/fluidtype.model';
import { HeatType } from '../models/heattype.model';
import { Page2 } from '../models/page2.model';
import { PercentGlycol } from '../models/percentglycol.model';
import { ReheatType } from '../models/reheattype.model';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit{
  
  numregex = /^[0-9]+(\.[0-9]{1,2})?$/;
  limitdecimals:FormGroup 
  constructor(private router: Router, private service: GetFunctionsService, private postservice: PostFunctionService)  {

    this.limitdecimals= new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern(this.numregex)])
    });
   }

  disableinput:boolean=true;
  
  ngOnInit(): void {
    this.service.getAutoloader().subscribe(data=>this.service.autoloaders = data);
    this.service.getFluidType().subscribe(data => this.fluidType = data);
    this.service.getPercentGlycol().subscribe(data => this.percentGlycol = data);
    this.service.getEvapFilterType().subscribe(data => this.evapFilterType = data);
    this.service.getHeatType().subscribe(data => this.heatType = data);
    this.service.getReheatType().subscribe(data => this.reheatType = data);
    this.service.getAirSideEcon().subscribe(data => this.sideEconomizer = data);
    this.service.getPage2(this.service.id).subscribe(data => this.page2 = data);   
  }
  autoloader:Autoloader[]=[];
    init(){
      if(this.page2.mixedair == 1){
        this.mixedair = true;
      }
      else (this.mixedair = false);
      
      if(this.page2.chilledwatercoil == 1){
        this.chilledwatercoil = true;
      } 
      else this.chilledwatercoil = false;
  
      if (this.page2.heatnreheat == 1){
        this.heatnreheat = true;
      }
      else this.heatnreheat = false;

      if (this.page2.watersideecon == 1){
        this.waterEconomizer = true;
      }
      else this.waterEconomizer = false;


      if(this.page2.reheattype == 'Hot Water Coil'){
        this.lastCheck=true;
      }
      else{
        this.lastCheck=false;
      }

      if(this.page2.mixedair == 0){
        this.page2.scfmmix = '0';
        this.page2.eatdbmix = '0';
        this.page2.eatwbmix = '0';
      }

      if(this.page2.lftgpm == 1){
        this.lftbtn = false;
        this.gpmbtn = true;
      }else if(this.page2.lftgpm == 0) {
        this.lftbtn = true;
        this.gpmbtn = false;
      }

      if(this.page2.fluidtype != 'Water'){
        this.glycol = false;
      } else this.glycol = true;

      this.heat = this.page2.electrictemprise;
    }
    
    fluidType:FluidType[]=[];
    percentGlycol:PercentGlycol[]=[];
    evapFilterType:EvapFilterType[]=[];
    heatType:HeatType[]=[];
    reheatType:ReheatType[]=[];
    sideEconomizer:AirSideEconomizer[]=[];
    glycol:boolean=true;
    lastCheck:boolean=true;
    inputvalue:boolean = true;
    
    nothing:number=0;
    public id:number = 0;

    mixedair:boolean=false; 
    chilledwatercoil:boolean = false;
    waterEconomizer:boolean=false;
    heatnreheat:boolean = false;

    popup1:boolean = false;

    page2:Page2={
      scfmret: 0,
      espret:0,
      eatdbret:0,
      eatwbret:0,
      scfmout:0,
      espout:0,
      eatdbout:0,
      eatwbout:0,
      scfmmix:'',
      espmix:0,
      eatdbmix:'',
      eatwbmix:'',
      mixedair:0,
      fluidtype:'',
      percentglycol:'',
      gpm:0,
      eft:0,
      evapfiltertype:'',
      heattype:'',
      reheattype:'',
      airsideecon:'',
      electrictemprise:'',
      chilledwatercoil:0,
      watersideecon:0,
      heatnreheat:0,
      eatf:0,
      approxlat:0,
      eft2:0,
      percentglycol2:'',
      fluidtype2:'',
      lftgpm:0,
      lftgpmvalue:'',
      eatdb2:0,
      eatwb2:0,
      eft3:0,
      approxbtuh:0
    }

    // loader:Autoloader = {
    //   scfmret:0,
    //   scfmout:0,
    //   esp:0,
    //   eatdb1ret:0,
    //   eatdb1mix:0,
    //   eatwb1ret:0,
    //   eatwb1mix:0,
    //   gpm1:0,
    //   eft1:0,
    //   evapfiltertype:'None',
    //   heattype:'No Heat',
    //   reheattype:'No Reheat',
    //   airsideecon:'None',
    //   eatf:0,
    //   approxlat:0,
    //   eft2:0,
    //   lftgpm:0,
    //   eatdb2:0,
    //   eatwb2:0,
    //   eft3:0,
    //   approxbtuh:0,
    //   tonnage:'',
    //   voltage:''
    // }
  
  autoload(){
    // this.service.autoloaders.forEach(element => {
    //   if(element.tonnage == this.service.project.p1.tonnage && element.voltage == this.service.project.p1.voltage){
    //     this.service.loader = element;
    //     console.log(element);
    //   }
    // });
    for(let i=0;i<this.service.autoloaders.length;i++){
      if(this.service.autoloaders[i].tonnage == this.service.project.p1.tonnage && this.service.autoloaders[i].voltage == this.service.project.p1.voltage){
        this.service.loader = this.service.autoloaders[i];
        console.log(this.service.loader)
      }
    }

    this.page2.scfmret = this.service.loader.scfmret;
    this.page2.scfmout = this.service.loader.scfmout;
    this.page2.espret = this.service.loader.esp;
    this.page2.eatdbret = this.service.loader.eatdb1ret;
    this.page2.eatdbout = this.service.loader.eatdb1out;
    this.page2.eatwbret = this.service.loader.eatwb1ret;
    this.page2.eatwbout = this.service.loader.eatwb1out;
    this.page2.fluidtype = this.service.loader.fluid1;
    this.page2.percentglycol = this.service.loader.percent1;
    this.page2.gpm = this.service.loader.gpm1;
    this.page2.eft = this.service.loader.eft1;
    this.page2.evapfiltertype = this.service.loader.evapfiltertype;
    this.page2.heattype = this.service.loader.heattype;
    this.page2.reheattype = this.service.loader.reheattype;
    this.page2.airsideecon = this.service.loader.airsideecon;
    this.page2.eatf = this.service.loader.eatf;
    this.page2.approxlat = this.service.loader.approxlat;
    this.page2.eft2 = this.service.loader.eft2;
    this.page2.fluidtype2 = this.service.loader.fluid2;
    this.page2.percentglycol2 = this.service.loader.percent2;
    this.page2.lftgpmvalue = this.service.loader.lftgpm.toString();
    this.page2.eatdb2 = this.service.loader.eatdb2;
    this.page2.eatwb2 = this.service.loader.eatwb2;
    this.page2.approxbtuh = this.service.loader.approxbtuh;
  }

  fluidChange(event:Event){
    for(let i = 0;i<this.fluidType.length; i++){
      if ((event.target as HTMLSelectElement).value == this.fluidType[i].name.toString()){
        if (i==0){
          console.log(i)
          this.glycol=true;
        }
        else{
          this.glycol=false;
        }
      }
    }
  }
  
  waterSideEcon(){
    //this.page2.watersideecon = !this.page2.watersideecon;
    console.log(this.page2.watersideecon);
  }
  heatNReheat(){
    //this.page2.heatnreheat = !this.page2.heatnreheat;
    console.log(this.page2.evapfiltertype)
  }

  changeairsideecon(event:Event){
    this.page2.airsideecon =(event.target as HTMLSelectElement).value;
  }
 
  displayCheck(event:Event){
    this.page2.reheattype = (event.target as HTMLSelectElement).value;
    for(let i = 0;i<this.reheatType.length; i++){
      if ((event.target as HTMLSelectElement).value == this.reheatType[i].name.toString()){
        if (i==0){
          this.lastCheck=true;
        }
        else{
          this.lastCheck=false;
        }
      }
    }
  }
  
  calculatemix(){
    if(this.page2.mixedair == 1){
      this.page2.scfmmix = (parseFloat(this.page2.scfmret.toString()) + parseFloat(this.page2.scfmout.toString())).toFixed(0);
      this.calculatedb();
      this.calculatewb();
  }
    
  }
  calculatedb(){
    if((this.page2.eatdbret < 70 || this.page2.eatdbret > 86)||(this.page2.eatdbout < 70 || this.page2.eatdbout >86)){
      alert('EAT DB must be between 70 and 86');
      this.page2.eatdbret = 76;
      if(this.page2.mixedair == 1){
        this.page2.eatdbout = 76;
        this.page2.eatdbmix = (((parseFloat(this.page2.scfmret.toString())*parseFloat(this.page2.eatdbret.toString()))+((parseFloat(this.page2.scfmout.toString())*parseFloat(this.page2.eatdbout.toString()))))/((parseFloat(this.page2.scfmret.toString()))+(parseFloat(this.page2.scfmout.toString())))).toFixed(1);
      }
    }
    else {
      if(this.page2.mixedair == 1){
        this.page2.eatdbmix = (((parseFloat(this.page2.scfmret.toString())*parseFloat(this.page2.eatdbret.toString()))+((parseFloat(this.page2.scfmout.toString())*parseFloat(this.page2.eatdbout.toString()))))/((parseFloat(this.page2.scfmret.toString()))+(parseFloat(this.page2.scfmout.toString())))).toFixed(1);
      }
      this.eatdb();
    }
     
  }

  calculatewb(){
    if((this.page2.eatwbret < 55.76 || this.page2.eatwbret > 72) || (this.page2.eatwbout < 55.76 || this.page2.eatwbout > 72)){
      alert('EAT WB must be between 55.76 and 72');
      this.page2.eatwbret = 60;
      if(this.page2.mixedair == 1){
        this.page2.eatwbout = 60;
        this.page2.eatwbmix = (((parseFloat(this.page2.scfmret.toString())*parseFloat(this.page2.eatwbret.toString()))+((parseFloat(this.page2.scfmout.toString())*parseFloat(this.page2.eatwbout.toString()))))/((parseFloat(this.page2.scfmret.toString()))+(parseFloat(this.page2.scfmout.toString())))).toFixed(1);
      }
    }else{
      if(this.page2.mixedair == 1){
        this.page2.eatwbmix = (((parseFloat(this.page2.scfmret.toString())*parseFloat(this.page2.eatwbret.toString()))+((parseFloat(this.page2.scfmout.toString())*parseFloat(this.page2.eatwbout.toString()))))/((parseFloat(this.page2.scfmret.toString()))+(parseFloat(this.page2.scfmout.toString())))).toFixed(1);
      }
      this.eatwb();
    }
    
  }

  changeheattype(event:Event){
    
    this.page2.heattype = (event.target as HTMLSelectElement).value;

    switch((event.target as HTMLSelectElement).value){
      case 'None':
        this.heat = '';
        this.page2.electrictemprise = '0';
        break;
      case '15 kW 2-Stage':
        this.heat = ((15*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
        break;
      case '20 kW 2-Stage':
        this.heat = ((20*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
       break;
      case '25 kW 2-Stage':
        this.heat = ((25*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
      break;
      case '30 kW 2-Stage':
        this.heat = ((30*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
      break;
      case '40 kW 2-Stage':
        this.heat = ((40*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
      break;
      case '45 kW 2-Stage':
        this.heat = ((45*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
      break;
      case '50 kW 2-Stage':
        this.heat = ((50*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
      break;
      case '60 kW 2-Stage':
        this.heat = ((60*3412.14)/(1.08*parseFloat(this.page2.scfmret.toString()))).toFixed(1);
        this.page2.electrictemprise = this.heat;
      break;
      default: 
      this.heat = '0';
      this.page2.electrictemprise = '0';
    }

    console.log(this.page2.heattype);
  }

  changeevapfiltertype(event:Event){
    this.page2.evapfiltertype = (event.target as HTMLSelectElement).value;
  }

  heat:string='';
  calculateHeat(){
    
  }
  lastDiv(){
      this.waterEconomizer=!this.waterEconomizer;  
  }

  updatePage2(){
    this.savepage2();
    this.postservice.updatePage2(this.page2,this.service.id).subscribe(data => this.page2 = data);
    // this.ngOnInit();
    console.log(this.page2.heattype);
  }
  savepage2(){
    this.service.project.p2 = this.page2;
  }
  eatdb(){
    if(this.page2.eatdbret < this.page2.eatwbret){
      this.page2.eatdbret = 0;
      alert('Wet Bulb must be less than Dry Bulb');
    }
  }
  eatwb(){
    if(this.page2.eatdbret < this.page2.eatwbret){
      this.page2.eatwbret = 0;
      alert('Wet Bulb must be less than Dry Bulb');
    }
  }

  numberWithCommas(x:number) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log("log");
    return parts.join(".");
  }
  changemixedair(){
    if(this.page2.mixedair == 1){
      this.page2.mixedair = 0;
      this.mixedair = false;
      this.page2.scfmmix = '0';
      this.page2.eatdbmix = '0';
      this.page2.eatwbmix = '0';
      this.page2.scfmout = 0;
      this.page2.eatdbout = 0;
      this.page2.eatwbout = 0;
    }
    else if (this.page2.mixedair == 0){
      this.page2.mixedair = 1;
      this.mixedair = true;
      
      this.page2.eatdbout = 76;
      this.page2.eatwbout = 76;
      this.calculatemix();
      this.calculatedb();
      this.calculatewb();
    }
  }
  validategpm(){
    if (this.page2.gpm < 52.5 || this.page2.gpm > 140){
      alert('GPM must be between 52.5 and 140');
      this.page2.gpm = 60;
    }
  }
  validateeft(){
    if (this.page2.eft < 55 || this.page2.eft > 115){
      alert('EFT must be between 55 and 115')
      this.page2.eft = 60;
    }
  }
  validateeatf(){
    if(this.page2.eatf < -20 || this.page2.eatf >75){
      alert("EAT must be between -20 and 75");
      this.page2.eatf = 0;
    }
  }
  validateeft2(){
    if(this.page2.eft2 < 80 || this.page2.eft2 > 212){
      alert('EFT must be between 80 and 212');
      this.page2.eft2 = 90;
    }
  }
  validateeft3(){
    if(this.page2.eft3 < 80 || this.page2.eft3 > 212){
      alert('EFT must be between 80 and 212');
      this.page2.eft3 = 90;
    }
  }
  validateeatdb2(){
    if(this.page2.eatdb2 < 70 || this.page2.eatdb2 > 86){
      alert('EAT DB must be between 70 and 86');
      this.page2.eatdb2 = 76;
    }else{
      if (this.page2.eatwb2 > this.page2.eatdb2){
        alert('Wet Bulb must be less than Dry Bulb')
        this.page2.eatwb2 = 60;
        this.page2.eatdb2 = 76;
      }
    }
  }
  validateeatwb2(){
    if(this.page2.eatwb2 < 55.76 || this.page2.eatwb2 > 72){
      alert('EAT WB must be between 55.76 and 72');
      this.page2.eatwb2 = 60;
    }
    else{
      if (this.page2.eatwb2 > this.page2.eatdb2){
        alert('Wet Bulb must be less than Dry Bulb')
        this.page2.eatwb2 = 60;
        this.page2.eatdb2 = 76;
      }
    }
  }
  espvalidator(){
    if(this.page2.espret > 2.5 || this.page2.espret < 0){
      alert('ESP Must be Between 0 and 2.5');
      this.page2.espret = 1;
    }
    console.log('working')
  }
  changewatercoil(){
    if(this.page2.chilledwatercoil == 1){
      this.page2.chilledwatercoil = 0;
      this.chilledwatercoil = false;
    }
    else if(this.page2.chilledwatercoil == 0){
      this.page2.chilledwatercoil = 1;
      this.chilledwatercoil = true;
    }
  }

  changewaterside(){
    if(this.page2.watersideecon == 1){
      this.page2.watersideecon = 0;
      this.waterEconomizer = false;
    }
    else if(this.page2.watersideecon == 0){
      this.page2.watersideecon = 1;
      this.waterEconomizer = true;
    }
    console.log(this.waterEconomizer);
    console.log(this.page2.watersideecon);
  }

  changeheatnreheat(){
    if(this.page2.heatnreheat == 1){
      this.page2.heatnreheat = 0;
      this.heatnreheat = false;
    }
    else if(this.page2.heatnreheat == 0){
      this.page2.heatnreheat = 1;
      this.heatnreheat = true;
    }
  }


  test(){
    console.log(this.service.loader);
  }

  radios(){
    if(this.page2.lftgpm == 1){
      this.page2.lftgpm = 0;
      this.lftbtn = false;
      this.gpmbtn = true;
    }else if(this.page2.lftgpm == 0) {
      this.page2.lftgpm = 1;
      this.lftbtn = true;
      this.gpmbtn = false;
    }
  }

  lftbtn:boolean = true;
  gpmbtn:boolean = false;

}
