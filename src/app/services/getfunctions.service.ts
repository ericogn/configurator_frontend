import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Output } from "@angular/core";
import { environment } from "src/environments/environment";
import { AirSideEconomizer } from "../models/airsideeconomizer.model";
import { BlowerType } from "../models/blowertype.model";
import { BmsCommunication } from "../models/bmscomm.model";
import { DigitalScrollComp } from "../models/digitalscrollcomp.model";
import { DuctHumidSensor } from "../models/ducthumidsensor.model";
import { DuctTempSensor } from "../models/ducttempsensor.model";
import { EvapAirPath } from "../models/evapairpath.model";
import { EvapFilterType } from "../models/evapfiltertype.model";
import { FluidType } from "../models/fluidtype.model";
import { HeatType } from "../models/heattype.model";
import { PercentGlycol } from "../models/percentglycol.model";
import { ProtectiveCoilCoating } from "../models/protectivecoating.model";
import { Voltage } from "../models/voltage.model";
import { Module } from "../models/module.model";
import { ReheatType } from "../models/reheattype.model";
import { Tonnage } from "../models/tonnage.model";
import { UnitInsulation } from "../models/unitinsulation.model";
import { VavAppType } from "../models/vavapptype.model";
import { WallHumidSensor } from "../models/wallhumidsensor.model";
import { WallTempSensor } from "../models/walltempsensor.model";
import { Quantity } from "../models/quantity.model";
import { Page1 } from "../models/page1.model";
import { Page2 } from "../models/page2.model";
import { Page4 } from "../models/page4.model";
import { Page5 } from "../models/page5.model";
import { Page6 } from "../models/page6.model";
import { ProjectWithDetails } from "../models/totalproject.model";
import { Page3 } from "../models/page3.model";
import { Subtotal } from "../models/subtotal.model";
import { Prices } from "../models/prices.model";
import { Autoloader } from "../models/autoloader.model";
import { outputAst } from "@angular/compiler";
import { People } from "../models/people.model";
import { Details } from "../models/details.model";
import { catchError, Observable, of } from "rxjs";
import { Limitations } from "../models/limitations.model";


@Injectable({
    providedIn:'root'
})

export class GetFunctionsService{
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    private baseUrl = `${environment.apiUrl}`;
    
    setLocalStorage(key:string, value:any){
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage(key:string):any{
        if(typeof window != 'undefined'){
            const value = localStorage.getItem(key) as string;
            return JSON.parse(value);
        }  
    }

    constructor (private http: HttpClient){

    }
    allProjects:ProjectWithDetails[]=[];
    public email:string='';
    public name:string='';
    public company:string='';
    public lastProjectId:number = 0;
    public lastpage:number=0;
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
        lftgpmvalue:0,
        eatdb2:0,
        eatwb2:0,
        eft3:0,
        approxbtuh:0
      }
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
      page6:Page6 = {
        shipsplit:0, 
        compressoracoustic:0,
        protectivecoil:'',
        unitinsul:'',
        nonstandard:'',
        totalcost:0,
      }


    public id:number=0;
    public title: string ='';
    @Output() public project:Subtotal={
        p1:this.page1,
        p2:this.page2,
        p4:this.page4,
        p5:this.page5,
        p6:this.page6
    }

    public autoloaders: Autoloader[]=[];
      public loader:Autoloader = {
      scfmret:0,
      scfmout:0,
      esp:0,
      eatdb1ret:0,
      eatdb1out:0,
      eatwb1ret:0,
      eatwb1out:0,
      fluid1:'Water',
      percent1:'10%',
      gpm1:0,
      eft1:0,
      evapfiltertype:'None',
      heattype:'No heat',
      reheattype:'No reheat',
      airsideecon:'None',
      eatf:0,
      approxlat:0,
      eft2:0,
      fluid2:'Water',
      percent2:'10%',
      lftgpm:0,
      eatdb2:0,
      eatwb2:0,
      eft3:0,
      approxbtuh:0,
      tonnage:'',
      voltage:''
    }

    public limiations:Limitations[]=[];
    public boundary:Limitations={
        tonnage:'',
        voltage:'',
        scfmretmin :0,
        scfmretmax :0,
        scfmoutmin :0,
        scfmoutmax :0,
        espmin :0,
        espmax :0,
        eatdb1retmin :0,
        eatdb1retmax :0,
        eatdb1outmin :0,
        eatdb1outmax :0,
        eatwb1retmin :0,
        eatwb1retmax :0,
        eatwb1outmin :0,
        eatwb1outmax :0,
        gpmmin :0,
        gpmmax :0,
        eft1min :0,
        eft1max	:0,
        eatfmin	:0,
        eatfmax	:0,
        approxlatmin :0,
        approxlatmax :0,
        eft2min	:0,
        eft2max	:0,
        lftgpmmin :0,
        lftgpmmax :0,
        eatdb2min :0,
        eatdb2max :0,	
        eatwb2min :0,
        eatwb2max :0,
        eft3min	:0,
        eft3max	:0,
        btuhmin	:0,
        btuhmax :0
    }

    getAirSideEcon(){
        return this.http.get<AirSideEconomizer[]>(`${this.baseUrl}airsideecon/read.php`);
    }  
    getBlowerType(){
        return this.http.get<BlowerType[]>(`${this.baseUrl}blowertype/read.php`);
    } 
    getBmsComm(){
        return this.http.get<BmsCommunication[]>(`${this.baseUrl}bmscomm/read.php`);
    } 
    getDigitalScrollComp(){
        return this.http.get<DigitalScrollComp[]>(`${this.baseUrl}digitalscrollcomp/read.php`);
    } 
    getDuctHumidSensor(){
        return this.http.get<DuctHumidSensor[]>(`${this.baseUrl}ducthumidsensor/read.php`);
    }
    getDuctTempSensor(){
        return this.http.get<DuctTempSensor[]>(`${this.baseUrl}ducttempsensor/read.php`);
    } 
    getEvapAirPath(){
        return this.http.get<EvapAirPath[]>(`${this.baseUrl}evapairpath/read.php`);
    } 
    getEvapFilterType(){
        return this.http.get<EvapFilterType[]>(`${this.baseUrl}evapfiltertype/read.php`);
    } 
    getFluidType(){
        return this.http.get<FluidType[]>(`${this.baseUrl}fluidtype/read.php`);
    } 
    getHeatType(){
        return this.http.get<HeatType[]>(`${this.baseUrl}heattype/read.php`);
    } 
    getModule(){
        return this.http.get<Module[]>(`${this.baseUrl}module/read.php`);
    } 
    getPercentGlycol(){
        return this.http.get<PercentGlycol[]>(`${this.baseUrl}percentglycol/read.php`);
    } 
    getProtectiveCoilCoating(){
        return this.http.get<ProtectiveCoilCoating[]>(`${this.baseUrl}protectivecoilcoating/read.php`);
    } 
    getQuantity(){
        return this.http.get<Quantity[]>(`${this.baseUrl}quantity/read.php`);
    }
    getReheatType(){
        return this.http.get<ReheatType[]>(`${this.baseUrl}reheattype/read.php`);
    } 
    getTonnage(){
        return this.http.get<Tonnage[]>(`${this.baseUrl}tonnage/read.php`);
    } 
    getUnitInsulation(){
        return this.http.get<UnitInsulation[]>(`${this.baseUrl}unitinsulation/read.php`);
    } 
    getVavAppType(){
        return this.http.get<VavAppType[]>(`${this.baseUrl}vavapptype/read.php`);
    } 
    getVoltage(){
        return this.http.get<Voltage[]>(`${this.baseUrl}voltage/read.php`);
    }  
    getWallHumidSensor(){
        return this.http.get<WallHumidSensor[]>(`${this.baseUrl}wallhumidsensor/read.php`);
    }   
    getWallTempSensor(){
        return this.http.get<WallTempSensor[]>(`${this.baseUrl}walltempsensor/read.php`);
    } 
    getPage1(id:number){
        return this.http.get<Page1>(`${this.baseUrl}page1/getpage1.php?details=${id}`);
    }
    getPage2(id:number){
        return this.http.get<Page2>(`${this.baseUrl}page2/getpage2.php?details=${id}`);
    }
    getpage3(tons:number){
        return this.http.get<Page3>(`${this.baseUrl}page3/getpage3.php?tons=${tons}`);
    }
    getPage4(id:number){
        return this.http.get<Page4>(`${this.baseUrl}page4/getpage4.php?details=${id}`);
    }
    getPage5(id:number){
        return this.http.get<Page5>(`${this.baseUrl}page5/getpage5.php?details=${id}`);
    }
    getPage6(id:number){
        return this.http.get<Page6>(`${this.baseUrl}page6/getpage6.php?details=${id}`);
    }
    
    getProjectsByEmail(email:string){
        return this.http.get<ProjectWithDetails[]>(`${this.baseUrl}/projectsaver/getdetailsbyemail.php?email=${email}`)
    }

    getPage3(tons:number){
        return this.http.get<Page3>(`${this.baseUrl}/projectsaver/getunitperformancebyid.php?details=${tons}`)
    }

    getSubtotal(id:number){
        return this.http.get<Subtotal>(`${this.baseUrl}/projectsaver/getcurrentproject.php?details=${id}`)
    }

    generateInvoice(id:number){
        return this.http.get(`${this.baseUrl}/editPdf/pdf.php?details=${id}`)
    }

    getprices(){
        return this.http.get<Prices>(`${this.baseUrl}/prices/getprices.php`);
    }

    getAutoloader(){
        return this.http.get<Autoloader[]>(`${this.baseUrl}autoloader/getAllLines.php`);
    }
    getContacts(){
        return this.http.get<People[]>(`${this.baseUrl}details/getcontacts.php`);
    }
    getContractors(){
        return this.http.get<People[]>(`${this.baseUrl}details/getcontractors.php`);
    }
    getEngineers(){
        return this.http.get<People[]>(`${this.baseUrl}details/getengineers.php`);
    }
    getOwners(){
        return this.http.get<People[]>(`${this.baseUrl}details/getowners.php`);
    }
    getLimitations(){
        return this.http.get<Limitations[]>(`${this.baseUrl}limitations/getlines.php`);
    }


    
}