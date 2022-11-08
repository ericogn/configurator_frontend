import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page4 } from '../models/page4.model';
import { Quantity } from '../models/quantity.model';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-fourth-page',
  templateUrl: './fourth-page.component.html',
  styleUrls: ['./fourth-page.component.scss']
})
export class FourthPageComponent implements OnInit {

  page4:Page4={
    nonfused: 0,
    phasereversalsens:0,
    freezestat:0,
    tempavg:0,
    condesnatepump:0,
    compressorheater:0,
    remotewaterpump:0,
    waterflowswitch:0,
    contactsqty :0,
    usedfor:''
  }

  ngOnInit(): void {
    this.service.getQuantity().subscribe(data => this.quantity = data);
    this.service.getPage4(this.service.id).subscribe(data => this.page4 = data);
  }
  
  constructor(private router:Router,private service:GetFunctionsService, private postservice: PostFunctionService) { }

  
  popup:boolean=false;
  qty:boolean=false;
  quantity:Quantity[]=[];

  phsens:boolean = false;
  freezestat:boolean = false;
  freezestatavg: boolean = false;
  condensatepump: boolean = false;
  compressor: boolean = false;
  remote:boolean = false;
  waterflow:boolean = false;

  init(){
    if(this.page4.phasereversalsens == 1){
      this.phsens = true;
    }
    else (this.phsens = false);
    
    if(this.page4.freezestat == 1){
      this.freezestat = true;
    }
    else (this.freezestat = false);

    if(this.page4.tempavg == 1){
      this.freezestatavg = true;
    }
    else (this.freezestatavg = false)

    if(this.page4.condesnatepump == 1){
      this.condensatepump = true;
    }
    else (this.condensatepump = false)

    if(this.page4.compressorheater == 1){
      this.compressor = true;
    }
    else (this.compressor = false)

    if(this.page4.remotewaterpump == 1){
      this.remote = true;
    }
    else (this.remote = false)

    if(this.page4.waterflowswitch == 1){
      this.waterflow = true;
    }
    else (this.waterflow = false)    

    if(this.page4.nonfused == 1){
      this.bt1=false;
      this.bt2=true;
    }else{
      this.bt1 = true;
      this.bt2 = false;
    }
  }
  
  showtextarea(event:Event){
    this.page4.contactsqty = Number((event.target as HTMLSelectElement).value)
    for(let i = 0;i<this.quantity.length; i++){
      if ((event.target as HTMLSelectElement).value == this.quantity[i].name.toString()){
        if (i==0){
          console.log(i)
          this.qty=false;
        }
        else{
          console.log(i);
          this.qty=true;
        }
      }
    }
    
  }
  show(){
    //this.service.getPage4(this.service.id).subscribe(data => this.page4 = data);
    //console.log(this.page4);
  }
  prevPage(){
    this.router.navigateByUrl('thirdpage');
  }
  nextPage(){
    this.router.navigateByUrl('sixthpage');
  }

  updatePage4(){
    this.postservice.updatePage4(this.page4,this.service.id).subscribe(dt => this.page4 = dt);
    // this.ngOnInit();
  }

  fct(){
    // this.postservice.updatePage4(this.page4, this.service.id).subscribe(dt => this.page4 = dt);
    // this.ngOnInit();
  }


  changephasereversal(){
    if(this.page4.phasereversalsens == 1){
      this.page4.phasereversalsens = 0;
      this.phsens = false;
    }
    else if (this.page4.phasereversalsens == 0){
      this.page4.phasereversalsens = 1;
      this.phsens = true;
    }
  }

  changefreezestat(){
    if(this.page4.freezestat == 1){
      this.page4.freezestat = 0;
      this.freezestat = false;
    }
    else if (this.page4.freezestat == 0){
      this.page4.freezestat = 1;
      this.freezestat = true;
    }
  }

  changetempavg(){
    if(this.page4.tempavg == 1){
      this.page4.tempavg = 0;
      this.freezestatavg = false;
    }
    else if (this.page4.tempavg == 0){
      this.page4.tempavg = 1;
      this.freezestatavg = true;
    }
  }

  changecondensatepump(){
    if(this.page4.condesnatepump == 1){
      this.page4.condesnatepump = 0;
      this.condensatepump = false;
    }
    else if (this.page4.condesnatepump == 0){
      this.page4.condesnatepump = 1;
      this.condensatepump = true;
    }
  }

  changecompressor(){
    if(this.page4.compressorheater == 1){
      this.page4.compressorheater = 0;
      this.compressor = false;
    }
    else if (this.page4.compressorheater == 0){
      this.page4.compressorheater = 1;
      this.compressor = true;
    }
  }


  changeremote(){
    if(this.page4.remotewaterpump == 1){
      this.page4.remotewaterpump = 0;
      this.remote = false;
    }
    else if (this.page4.remotewaterpump == 0){
      this.page4.remotewaterpump = 1;
      this.remote = true;
    }
  }


  changewaterflow(){
    if(this.page4.waterflowswitch == 1){
      this.page4.waterflowswitch = 0;
      this.waterflow = false;
    }
    else if (this.page4.waterflowswitch == 0){
      this.page4.waterflowswitch = 1;
      this.waterflow = true;
    }
  }

  test(){
    if(this.page4.nonfused == 1){
      this.page4.nonfused = 0;
      this.bt1 =true;
      this.bt2 = false;
      console.log(this.page4.nonfused)
    }
    else if (this.page4.nonfused == 0){
      this.page4.nonfused = 1;
      this.bt1 =false;
      this.bt2 = true;
      console.log(this.page4.nonfused)
    }
  }
  bt1:boolean = false;
  bt2:boolean = true; 
}
