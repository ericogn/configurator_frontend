export interface ProjectWithDetails{
    id:number,
    name: string;
    reforderno:string;
    address:string;
    city:string;
    country:string;
    state:string;
    zip:string;
    primarycontact:string;
    engarch:string;
    owner:string;
    contractor:string;
    status:string;
    type:string;
    design:string;
    details: number;
    email:string;
    quantity:number;
    unittag:string;
    basemodel:string;
    producttype:string;
    tonnage:string;
    voltage:string;
    module:string;
    blowertype:string;
    evapairpath:string;
    digitalscrollcomp: string;
    scfmret: number;
    espret:number;
    eatdbret:number;
    eatwbret:number;
    scfmout:number;
    espout:number;
    eatdbout:number;
    eatwbout:number;
    scfmmix:number;
    espmix:number;
    eatdbmix:number;
    eatwbmix:number;
    mixedair:boolean;
    fluidtype:string;
    percentglycol:string;
    gpm:number;
    eft:number;
    evapfiltertype:string;
    heattype:string;
    reheattype:string;
    airsideecon:string;
    chilledwatercoil:boolean;
    watersideecon:boolean;
    heatnreheat:boolean;
    eatf:number;
    approxlat:number;
    eft2:number;
    percentglycol2:string;
    fluidtype2:string;
    lftgpm:boolean;
    eatdb2:number;
    eatwb2:number;
    eft3:number;
    approxbtuh:number;
    nonfused:boolean;
    phasereversalsens:boolean;
    freezestat:boolean;
    condesnatepump:boolean;
    compressorheater:boolean;
    remotewaterpump:boolean;
    waterflowswitch:boolean;
    contactsqty :number;
    usedfor:string;
    vavapptype:string;
    walltempsens:number;
    wallhumidsens:number;
    ducttempsens:number;
    ducthumidsens:number;
    bmscomm:string; 
    marveldisplay:boolean; 
    scr:boolean;
    smokedetector:boolean; 
    firestat:boolean;
    shipsplit:boolean; 
    compressoracoustic:boolean; 
    protectivecoil:string;
    unitinsul:string;
    nonstandard:string; 
    totalcost:number;
    lastmodified:Date;
}