import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prices } from '../models/prices.model';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['./subtotal.component.scss']
})
export class SubtotalComponent implements OnInit {

  constructor(private router:Router,public service:GetFunctionsService, private postservice:PostFunctionService) { }

  ngOnInit(): void {
    this.init();
    this.getprices();
  }
  price:Prices={
    unit :0,
    t15 :0,
    t20 :0,
    t25 :0,
    t30 :0,
    t40 :0,
    t50 :0,
    t60 :0,
    t70 :0,
    t80 :0,
    t90 :0,
    v230 :0,
    v460 :0,
    v575 :0,
    singleleft :0,
    singleright :0,
    doubleleft :0,
    doubleright :0,
    digitalnone :0,
    digitalmix :0,
    blowerdpd :0,
    blowerecm :0,
    scrol :0,
    speed :0,
    in2merv8 :0,
    in2merv11 :0,
    in2merv13 :0,
    in4merv8 :0,
    in4merv11 :0,
    in4merv13 :0,
    in4merv8and13 :0,
    heatnone :0,
    kw15 :0,
    kw20 :0,
    kw25 :0,
    kw30 :0,
    kw40 :0,
    kw45 :0,
    kw50 :0,
    kw60 :0,
    heatsteamcoil :0,
    heathotwatercoil :0,
    fluid1 :0,
    reheattype :0,
    airsideecon :0,
    chilledwatercoil :0,
    watersideecon :0,
    heatnreheat :0,
    fluid2 :0,
    nonfused :0,
    nonfusedtrue :0,
    phasereversalsens :0,
    freezestat :0,
    tempavg :0,
    condensatepump :0,
    compressorheater :0,
    remotewaterpump :0,
    waterswitch :0,
    drycontacts :0,
    vavsingle :0,
    vavmulti :0,
    walltemp :0,
    wallhumid :0,
    ducttemp :0,
    ducthumid :0,
    bmsnone :0,
    bmsmstp :0,
    bmsip :0,
    bmsmodbus :0,
    bmstobedet :0,
    marveldisplay :0,
    scr :0,
    smokedetector :0,
    firestat :0,
    shipsplit :0,
    compressorcover :0,
    protectivenone :0,
    electrocoil :0,
    heresite :0,
    unitinsulnone :0,
    elastomeric :0,
    doublewall :0,
    nonstandard :0
  };

  unitprice:number = 0;
  voltageprice:number=0;
  moduleprice:number=0;
  blowerprice:number=0;
  evapprice:number=0;
  digitalprice:number=0;
  evapfilterprice:number=0;
  heattypeprice:number=0;
  reheattypeprice:number=0;
  airsideprice:number=0;
  chilledwaterprice:number=0;
  watereconprice:number=0;
  heatnreheatprice:number=0;
  nonfusedprice:number=0;
  phasereversalprice:number=0;
  freezestatprice:number=0;
  freezestattempprice:number=0;
  condensateprice:number=0;
  compressorprice:number=0;
  remotewaterpumpprice:number=0;
  waterswitchprice:number=0;
  contactsprice:number=0;
  vavprice:number=0;
  walltempprice:number=0;
  wallhumidprice:number=0;
  ducttempprice:number=0;
  ducthumidprice:number=0;
  bmsprice:number=0;
  marvelprice:number=0;
  scrprice:number=0;
  smokeprice:number=0;
  firestatprice:number=0;
  shipsplitprice:number=0;
  compressoracousticprice:number=0;
  protectiveprice:number=0;
  unitinsulprice:number=0;
  nonstandardprice:number=0;
  
  totalsum:number = 0;

  initprices(){
    switch(this.service.project.p1.tonnage)
    {
      case '15':
        this.unitprice = this.price.t15;
      break;
      case '20':
        this.unitprice = this.price.t20;
      break;
      case '25':
        this.unitprice = this.price.t25;
      break;
      case '30':
        this.unitprice = this.price.t30;
      break;
      case '40':
        this.unitprice = this.price.t40;
      break;
      case '50':
        this.unitprice = this.price.t50;
      break;
      case '60':
        this.unitprice = this.price.t60;
      break;
      case '70':
        this.unitprice = this.price.t70;
      break;
      case '80':
        this.unitprice = this.price.t80;
      break;
      case '90':
        this.unitprice = this.price.t90;
      break;
      default:
        this.unitprice = 0;
    }

    switch(this.service.project.p1.blowertype)
    {
      case 'DPD Direct Drive Parallel':
        this.blowerprice = this.price.blowerdpd;
      break;
      case 'ECM Fans':
        this.blowerprice = this.price.blowerecm;
      break;
      default: this.blowerprice = 0;
    }

    switch(this.service.project.p1.voltage)
    {
      case '208/230V-3P-60':
        this.voltageprice = this.price.v230;
      break;
      case '460V-3P-60':
        this.voltageprice = this.price.v460;
      break;
      case '575V-3P-60':
        this.voltageprice = this.price.v575;
      break;
      default: 
      this.voltageprice = 0;
    }

    switch(this.service.project.p2.heattype)
    {
      case 'No heat':
        this.heattypeprice = this.price.heatnone;
      break;
      case '15 kW 2-Stage':
        this.heattypeprice = this.price.kw15;
      break;
      case '20 kW 2-Stage':
        this.heattypeprice = this.price.kw20;
      break;
      case '25 kW 2-Stage':
        this.heattypeprice = this.price.kw25;
      break;
      case '30 kW 2-Stage':
        this.heattypeprice = this.price.kw30;
      break;
      case '40 kW 2-Stage':
        this.heattypeprice = this.price.kw40;
      break;
      case '45 kW 2-Stage':
        this.heattypeprice = this.price.kw45;
      break;
      case '50 kW 2-Stage':
        this.heattypeprice = this.price.kw50;
      break;
      case '60 kW 2-Stage':
        this.heattypeprice = this.price.kw60;
      break;
      case 'Steam Coil - Distributing (Non Frz)':
        this.heattypeprice = this.price.heatsteamcoil;
      break;
      case 'Hot Water Coil':
        this.heattypeprice = this.price.heathotwatercoil;
      break;
      default: this.heattypeprice = 0;

    }

    switch(this.service.project.p1.module)
    {
      case 'Single - Left Hand':
        this.moduleprice = this.price.singleleft;
      break;
      case 'Single - Right Hand':
        this.moduleprice = this.price.singleright;
      break;
      case 'Double - Left Hand':
        this.moduleprice = this.price.doubleleft;
      break;
      case 'Double - Right Hand':
        this.moduleprice = this.price.doubleright;
      break;
      default:
        this.moduleprice = 0;
    }

    switch(this.service.project.p1.digitalscrollcomp)
    {
      case 'Digital Scroll (1st circ) + Std Scroll (2nd Circ)':
        this.digitalprice = this.price.digitalmix;
      break;
      case 'Digital Scroll':
        this.digitalprice = this.price.scrol;
      break;
      case 'Digital Speed':
        this.digitalprice = this.price.speed;
      break;
      default: 
        this.digitalprice = this.price.digitalnone;
    }

    switch(this.service.project.p2.evapfiltertype)
    {
      case '2in MERV 8':
        this.evapfilterprice = this.price.in2merv8;
      break;
      case '2in MERV 11':
        this.evapfilterprice = this.price.in2merv11;
      break;
      case '2in MERV 13':
        this.evapfilterprice = this.price.in2merv13;
      break;
      case '4in MERV 8':
        this.evapfilterprice = this.price.in4merv8;
      break;
      case '4in MERV 11':
        this.evapfilterprice = this.price.in4merv11;
      break;
      case '4in MERV 13':
        this.evapfilterprice = this.price.in4merv13;
      break;
      case '4in MERV 8 and 4 MERV 13':
        this.evapfilterprice = this.price.in4merv8and13;
      break;
      default:
        this.evapfilterprice = 0;
    }

    switch(this.service.project.p2.reheattype)
    {
      case 'Hot Water Coil':
        this.reheattypeprice = this.price.reheattype;
      break;
      default: 
        this.reheattypeprice = 0;
    }
    switch(this.service.project.p2.airsideecon)
    {
      case 'Contors Only':
        this.airsideprice = this.price.airsideecon;
      break;

      default:
        this.airsideprice = 0;
    }

    if(this.service.project.p2.chilledwatercoil == 1){
      this.chilledwaterprice = this.price.chilledwatercoil;
    }else{
      this.chilledwaterprice = 0;
    }

    if(this.service.project.p2.watersideecon == 1){
      this.watereconprice = this.price.watersideecon;
    } else{
      this.watereconprice = 0;
    }

    if(this.service.project.p2.heatnreheat == 1){
      this.heatnreheatprice = this.price.heatnreheat;
    } else{
      this.heatnreheatprice = 0;
    }

    if(this.service.project.p4.nonfused == 1){
      this.nonfusedprice = this.price.nonfusedtrue;
    } else{
      this.nonfusedprice = this.price.nonfused;
    }

    if(this.service.project.p4.phasereversalsens == 1){
      this.phasereversalprice = this.price.phasereversalsens;
    } else{
      this.phasereversalprice = 0;
    }

    if(this.service.project.p4.freezestat == 1){
      this.freezestatprice = this.price.freezestat;
    } else{
      this.freezestatprice = 0;
    }

    if(this.service.project.p4.tempavg == 1){
      this.freezestattempprice = this.price.tempavg;
    } else{
      this.freezestattempprice = 0;
    }

    if(this.service.project.p4.condesnatepump == 1){
      this.condensateprice = this.price.condensatepump;
    } else{
      this.condensateprice = 0;
    }

    if(this.service.project.p4.compressorheater == 1){
      this.compressorprice = this.price.compressorheater;
    } else{
      this.compressorprice = 0;
    }

    if(this.service.project.p4.remotewaterpump == 1){
      this.remotewaterpumpprice = this.price.remotewaterpump;
    } else{
      this.remotewaterpumpprice = 0;
    }

    if(this.service.project.p4.waterflowswitch == 1){
      this.waterswitchprice = this.price.waterswitch;
    }else{
      this.waterswitchprice = 0;
    }

    this.contactsprice = this.service.project.p4.contactsqty * this.price.drycontacts;

    switch(this.service.project.p5.vavapptype)
    {
      case 'Multi-Zone':
        this.vavprice = this.price.vavmulti;
      break;
      case 'Single-Zone':
        this.vavprice = this.price.vavsingle;
      break;
      default:
        this.vavprice = 0;
    }
    
    this.walltempprice = this.service.project.p5.walltempsens * this.price.walltemp;
    this.wallhumidprice = this.service.project.p5.wallhumidsens * this.price.wallhumid;
    this.ducttempprice = this.service.project.p5.ducttempsens * this.price.ducttemp;
    this.ducthumidprice = this.service.project.p5.ducthumidsens * this.price.ducthumid;

    switch(this.service.project.p5.bmscomm)
    {
      case 'None':
        this.bmsprice = this.price.bmsnone;
      break;
      case 'BACnet - MS/TP':
        this.bmsprice = this.price.bmsmstp;
      break;
      case 'BACnet - IP (Ethernet)':
        this.bmsprice = this.price.bmsip;
      break;
      case 'ModBus':
        this.bmsprice = this.price.bmsmodbus;
      break;
      case 'To Be Determined':
        this.bmsprice = this.price.bmstobedet;
      break;
      default:
        this.bmsprice = 0;
    }

    if(this.service.project.p5.marveldisplay == 1){
      this.marvelprice = this.price.marveldisplay;
    }else{
      this.marvelprice = 0;
    }

    if(this.service.project.p5.scr == 1){
      this.scrprice = this.price.scr;
    } else{
      this.scrprice = 0;
    }

    if(this.service.project.p5.smokedetector == 1){
      this.smokeprice = this.price.smokedetector;
    }else{
      this.smokeprice = 0;
    }

    if(this.service.project.p5.firestat == 1){
      this.firestatprice = this.price.firestat;
    }else{
      this.firestatprice = 0;
    }

    if(this.service.project.p6.compressoracoustic == 1){
      this.compressoracousticprice = this.price.compressorcover;
    }else{
      this.compressoracousticprice = 0;
    }

    switch(this.service.project.p6.protectivecoil)
    {
      case 'None':
        this.protectiveprice = this.price.protectivenone;
      break;
      case 'ElectroCoil / E-Coat':
        this.protectiveprice = this.price.electrocoil;
      break;
      case 'Heresite':
        this.protectiveprice = this.price.heresite;
      break;
      default: this.protectiveprice = 0;
    }

    switch(this.service.project.p6.unitinsul)
    {
      case 'None':
        this.unitinsulprice = this.price.unitinsulnone;
      break;
      case '1 in Elastomeric Foam':
        this.unitinsulprice = this.price.elastomeric;
      break;
      case 'Double Wall - Solid Panel':
        this.unitinsulprice = this.price.doublewall;
      break;
      default: this.unitinsulprice = 0;
    }

    this.nonstandardprice = this.service.project.p6.totalcost;


    
    this.totalsum = parseFloat(this.unitprice.toString()) +
    parseFloat(this.voltageprice.toString()) +
    parseFloat(this.moduleprice.toString()) +
    parseFloat(this.blowerprice.toString()) +
    parseFloat(this.evapprice.toString()) +
    parseFloat(this.digitalprice.toString()) +
    parseFloat(this.evapfilterprice.toString()) +
    parseFloat(this.heattypeprice.toString()) +
    parseFloat(this.airsideprice.toString()) +
    parseFloat(this.reheattypeprice.toString()) +
    parseFloat(this.chilledwaterprice.toString()) +
    parseFloat(this.watereconprice.toString()) +
    parseFloat(this.heatnreheatprice.toString()) +
    parseFloat(this.nonfusedprice.toString()) +
    parseFloat(this.phasereversalprice.toString()) +
    parseFloat(this.freezestatprice.toString()) +
    parseFloat(this.freezestattempprice.toString()) +
    parseFloat(this.condensateprice.toString()) +
    parseFloat(this.compressorprice.toString()) +
    parseFloat(this.remotewaterpumpprice.toString()) +
    parseFloat(this.waterswitchprice.toString()) +
    parseFloat(this.contactsprice.toString()) +
    parseFloat(this.vavprice.toString()) +
    parseFloat(this.walltempprice.toString()) +
    parseFloat(this.wallhumidprice.toString()) +
    parseFloat(this.ducttempprice.toString()) +
    parseFloat(this.ducthumidprice.toString()) +
    parseFloat(this.bmsprice.toString()) +
    parseFloat(this.marvelprice.toString()) +
    parseFloat(this.scrprice.toString()) +
    parseFloat(this.smokeprice.toString()) +
    parseFloat(this.firestatprice.toString()) +
    // parseFloat(this.shipsplitprice.toString()) +
    parseFloat(this.compressoracousticprice.toString()) +
    parseFloat(this.protectiveprice.toString()) +
    parseFloat(this.unitinsulprice.toString()) +
    parseFloat(this.service.project.p6.totalcost.toString());

    this.totalsum;
  }


  getprices(){
    this.service.getprices().subscribe(data => this.price = data);
  }
  nonfplaceholder:string = '';
  init(){
    if (this.service.project.p4.nonfused == 1){
      this.nonfplaceholder = '600V, 3PH, 100 Amps';
      console.log(this.service.project.p4.nonfused);
    }
    else{
      this.nonfplaceholder = 'None';
      console.log(this.service.project.p4.nonfused);
    }
    this.initprices();
  }
  prevPage(){
    this.router.navigateByUrl('seventhpage');
  }

  test(){
    console.log(this.service.project.p5.marveldisplay);
  }

}
