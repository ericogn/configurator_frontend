import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { FifthPageComponent } from '../fifth-page/fifth-page.component';
import { FirstPageComponent } from '../first-page/first-page.component';
import { FourthPageComponent } from '../fourth-page/fourth-page.component';
import { SecondPageComponent } from '../second-page/second-page.component';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';
import { SeventhPageComponent } from '../seventh-page/seventh-page.component';
import { SixthPageComponent } from '../sixth-page/sixth-page.component';
import { SubtotalComponent } from '../subtotal/subtotal.component';
import { ThirdPageComponent } from '../third-page/third-page.component';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  template: '<first-page-component></first-page-component>',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  constructor(private router:Router, private service:GetFunctionsService, private postService: PostFunctionService) { 
  
  }
  @ViewChild(FirstPageComponent) firstpage:FirstPageComponent = new FirstPageComponent(this.router, this.service, this.postService);
  @ViewChild(SecondPageComponent) secondpage:SecondPageComponent = new SecondPageComponent(this.router, this.service, this.postService);
  @ViewChild(ThirdPageComponent) thirdpage:ThirdPageComponent = new ThirdPageComponent(this.router, this.service, this.postService);
  @ViewChild(FourthPageComponent) fourthpage:FourthPageComponent = new FourthPageComponent(this.router, this.service, this.postService);
  @ViewChild(SixthPageComponent) sixthpage:SixthPageComponent = new SixthPageComponent(this.router, this.service, this.postService);
  @ViewChild(SeventhPageComponent) seventh:SeventhPageComponent = new SeventhPageComponent(this.router, this.service, this.postService);
  @ViewChild(SubtotalComponent) subtotal:SubtotalComponent = new SubtotalComponent(this.router, this.service, this.postService);

  ngOnInit(): void {
    // this.firstpage.ngOnInit();
    // this.secondpage.ngOnInit();
    // this.fourthpage.ngOnInit();
    // this.sixthpage.ngOnInit();
    // this.seventh.ngOnInit();
    // this.firstpage.init();
  }
  
  test(){
    this.firstpage.test();
  }
  
  update(){
    // this.savePage1();
    // this.savePage2();
    // this.savePage4();
    // this.savePage5();
    // this.savePage6();

    // this.firstpage.ngOnInit();
    // this.secondpage.ngOnInit();
    // this.fourthpage.ngOnInit();
    // this.sixthpage.ngOnInit();
    // this.seventh.ngOnInit();
    this.firstpage.init();
    this.secondpage.init();
    this.thirdpage.init();
    this.fourthpage.init();
    this.sixthpage.init();
    this.seventh.init();
    this.subtotal.init();
    this.updateProject();

    //this.thirdpage.ngOnInit();
    //this.trigger(this.firstpage.page1.tonnage);
  }

  

  savePage1(){
    this.firstpage.updatePage1();
    this.secondpage.init();
    this.thirdpage.init();
    //this.trigger(this.firstpage.page1.tonnage);
  }
  savePage2(){
    this.secondpage.updatePage2();
    this.fourthpage.init();
    this.thirdpage.init();
  }
  savePage3(){
    this.thirdpage.updatePage3();
    this.secondpage.init();
    this.firstpage.init();
  }
  savePage4(){
    this.fourthpage.updatePage4();
    //this.sixthpage.ngOnInit();
    this.sixthpage.init();
  }
  savePage5(){
    this.sixthpage.updatePage6();
    // this.fourthpage.ngOnInit();
    this.fourthpage.init()
    // this.seventh.ngOnInit();
    this.seventh.init();
  }
  savePage6(){
    this.seventh.updatePage7();
    //this.sixthpage.ngOnInit();
    this.sixthpage.init();
    this.updateProject();
    console.log(this.service.project);
    this.subtotal.init();
  }

  updateProject(){
    this.firstpage.savepage1();
    this.secondpage.savepage2();
    this.thirdpage.savepage3();
    this.fourthpage.savepage4();
    this.sixthpage.savepage6();
    this.seventh.savepage7();
    // this.service.project.p1 = this.firstpage.page1;
    // this.service.project.p2 = this.secondpage.page2;
    // this.service.project.p4 = this.fourthpage.page4;
    // this.service.project.p5 = this.sixthpage.page5;
    // this.service.project.p6 = this.seventh.page6;
  }

  invoice(){
    this.firstpage.updatePage1();
    this.secondpage.updatePage2();
    this.thirdpage.updatePage3();
    this.fourthpage.updatePage4();
    this.sixthpage.updatePage6();
    this.seventh.updatePage7();
    window.open(`http://configurator/editPdf/pdf.php?details=${this.service.id}`);
  }
}
