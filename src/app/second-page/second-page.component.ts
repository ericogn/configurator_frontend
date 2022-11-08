import { style } from '@angular/animations';
import { DecimalPipe } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, Directive, ElementRef, HostListener, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirSideEconomizer } from '../models/airsideeconomizer.model';
import { EvapFilterType } from '../models/evapfiltertype.model';
import { FluidType } from '../models/fluidtype.model';
import { HeatType } from '../models/heattype.model';
import { Page2 } from '../models/page2.model';
import { PercentGlycol } from '../models/percentglycol.model';
import { ReheatType } from '../models/reheattype.model';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';


// const roundTo = function(num: number, places: number) {
//   const factor = 10 ** places;
//   return Math.round(num * factor) / factor;
// };



// @Pipe({name : 'decimal'})
// export class Transform implements PipeTransform{
//   constructor(private decimalPipe :DecimalPipe){}
//   transform(value: any, locale?:string) {
//     this.decimalPipe.transform(value,1,locale)
//     // throw new Error('Method not implemented.');
//   }
// }
// @Pipe({
//   name: 'numberfr'
// })
// export class FrenchDecimalPipe implements PipeTransform {

//   transform(val: number): string {
//     // Format the output to display any way you want here.
//     // For instance:
//     if (val !== undefined && val !== null) {
//       return val.toLocaleString(/*arguments you need*/);
//     } else {
//       return '';
//     }
//   }
// }

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
    this.service.getFluidType().subscribe(data => this.fluidType = data);
    this.service.getPercentGlycol().subscribe(data => this.percentGlycol = data);
    this.service.getEvapFilterType().subscribe(data => this.evapFilterType = data);
    this.service.getHeatType().subscribe(data => this.heatType = data);
    this.service.getReheatType().subscribe(data => this.reheatType = data);
    this.service.getAirSideEcon().subscribe(data => this.sideEconomizer = data);
    this.service.getPage2(this.service.id).subscribe(data => this.page2 = data);   
  }

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
    this.postservice.updatePage2(this.page2,this.service.id).subscribe(data => this.page2 = data);
    // this.ngOnInit();
    console.log(this.page2.heattype);
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
    }
    else if (this.page2.mixedair == 0){
      this.page2.mixedair = 1;
      this.mixedair = true;
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
    console.log(this.page2);
    this.ngOnInit();
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
