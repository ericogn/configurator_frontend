import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitInsulation } from '../models/unitinsulation.model';
import { ProtectiveCoilCoating } from '../models/protectivecoating.model';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';
import { Page6 } from '../models/page6.model';

@Component({
  selector: 'app-seventh-page',
  templateUrl: './seventh-page.component.html',
  styleUrls: ['./seventh-page.component.scss']
})
export class SeventhPageComponent implements OnInit {

  constructor(private router:Router, private service: GetFunctionsService, private postService: PostFunctionService) { }
  page6:Page6 = {
    shipsplit:0, 
    compressoracoustic:0,
    protectivecoil:'',
    unitinsul:'',
    nonstandard:'',
    totalcost:0,
  }
  compressor:boolean=false;
  ship:boolean = false;
  ngOnInit(): void {
    this.service.id = this.service.getLocalStorage("id");
    this.service.getUnitInsulation().subscribe(data => this.unitInsul = data);
    this.service.getProtectiveCoilCoating().subscribe(data => this.protectivecoating = data);
    this.service.getPage6(this.service.id).subscribe(data => this.page6 = data);
  }
  unitInsul:UnitInsulation[]=[ ]
  protectivecoating:ProtectiveCoilCoating[]=[]
  nextPage(){
    this.router.navigateByUrl('subtotal');
  }
  prevPage(){
    this.router.navigateByUrl('sixthpage');
  }
  init(){
    if(this.page6.compressoracoustic == 1){
      this.compressor = true;
    }else this.compressor = false;

    if (this.page6.shipsplit == 1){
      this.ship = true;
    }else this.ship = false;
  }

  savepage7(){
    this.service.project.p6 = this.page6;
  }
  updatePage7(){
    this.postService.updatePage6(this.page6, this.service.id).subscribe(dt=> this.page6 = dt);
    // this.ngOnInit();
  }

  changeship(){
    if(this.page6.shipsplit == 1){
      this.page6.shipsplit = 0;
      this.ship = false;
    }else if (this.page6.shipsplit == 0){
      this.page6.shipsplit = 1;
      this.ship = true;
    }
  }

  changecompressor(){
    if(this.page6.compressoracoustic == 1){
      this.page6.compressoracoustic = 0;
      this.compressor = false;
    }else if(this.page6.compressoracoustic == 0){
      this.page6.compressoracoustic = 1;
      this.compressor = true;
    }
  }
}
