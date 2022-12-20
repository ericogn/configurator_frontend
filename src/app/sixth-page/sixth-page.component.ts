import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BmsCommunication } from '../models/bmscomm.model';
import { DuctHumidSensor } from '../models/ducthumidsensor.model';
import { DuctTempSensor } from '../models/ducttempsensor.model';
import { Page5 } from '../models/page5.model';
import { VavAppType } from '../models/vavapptype.model';
import { WallHumidSensor } from '../models/wallhumidsensor.model';
import { WallTempSensor } from '../models/walltempsensor.model';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-sixth-page',
  templateUrl: './sixth-page.component.html',
  styleUrls: ['./sixth-page.component.scss']
})
export class SixthPageComponent implements OnInit {

  page5:Page5={
    vavapptype:'Multi-Zone',
    walltempsens:0,
    wallhumidsens:0,
    ducttempsens:0,
    ducthumidsens:0,
    bmscomm:'None',
    marveldisplay:0,
    scr:0,
    smokedetector:0,
    firestat:0,
  }
  ngOnInit(): void {
    this.service.id = this.service.getLocalStorage("id");
    this.service.getVavAppType().subscribe(data => this.vavapptype = data);
    this.service.getWallTempSensor().subscribe(data => this.walltempsens = data);
    this.service.getWallHumidSensor().subscribe(data => this.wallhumidsens = data);
    this.service.getDuctTempSensor().subscribe(data => this.ducttempsens = data);
    this.service.getDuctHumidSensor().subscribe(data => this.ducthumidsens = data);
    this.service.getBmsComm().subscribe(data => this.bmscomm = data);
    this.service.getPage5(this.service.id).subscribe(data => this.page5 = data);
  }


  constructor(private router:Router, private service: GetFunctionsService, private postService: PostFunctionService) { }

  
  vavapptype:VavAppType[]=[];
  walltempsens:WallTempSensor[]=[];
  wallhumidsens:WallHumidSensor[]=[];
  ducttempsens:DuctTempSensor[]=[];
  ducthumidsens:DuctHumidSensor[]=[];
  bmscomm:BmsCommunication[]=[];

  marvel:boolean = false;
  scr: boolean = false;
  smoke: boolean = false;
  firestat: boolean =  false;

  changemarvel(){
    if(this.page5.marveldisplay == 1){
      this.page5.marveldisplay = 0;
      this.marvel = false;
    }
    else if (this.page5.marveldisplay == 0){
      this.page5.marveldisplay = 1;
      this.marvel = true;
    }
  }
  changescr(){
    if(this.page5.scr == 1){
      this.page5.scr = 0;
      this.scr = false;
    }
    else if (this.page5.scr == 0){
      this.page5.scr = 1;
      this.scr = true;
    }
  }

  changesmoke(){
    if(this.page5.smokedetector == 1){
      this.page5.smokedetector = 0;
      this.smoke = false;
    }
    else if (this.page5.smokedetector == 0){
      this.page5.smokedetector = 1;
      this.smoke = true;
    }
  }

  changefirestat(){
    if(this.page5.firestat == 1){
      this.page5.firestat = 0;
      this.firestat = false;
    }
    else if (this.page5.firestat == 0){
      this.page5.firestat = 1;
      this.firestat = true;
    }
  }

  init(){
    if(this.page5.marveldisplay == 1){
      this.marvel = true;
    }else (this.marvel = false);

    if(this.page5.scr == 1){
      this.scr = true;
    }else (this.scr = false);

    if(this.page5.smokedetector == 1){
      this.smoke = true;
    }else (this.smoke = false);

    if(this.page5.firestat == 1){
      this.firestat = true;
    }else (this.firestat = false);
  }

  prevPage(){
    this.router.navigateByUrl('fourthpage');
  }
  nextPage(){
    this.router.navigateByUrl('seventhpage');
  }

  savepage6(){
    this.service.project.p5 = this.page5;
  }
  updatePage6(){
    this.postService.updatePage5(this.page5,this.service.id).subscribe(data => this.page5 = data);
    // this.ngOnInit();
  }

  test(){
 
  }


}
