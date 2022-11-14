import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FifthPageComponent } from '../fifth-page/fifth-page.component';
import { FirstPageComponent } from '../first-page/first-page.component';
import { FourthPageComponent } from '../fourth-page/fourth-page.component';
import { Details } from '../models/details.model';
import { People } from '../models/people.model';
import { ProjectWithDetails } from '../models/totalproject.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { SecondPageComponent } from '../second-page/second-page.component';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';
import { SixthPageComponent } from '../sixth-page/sixth-page.component';
import { ThirdPageComponent } from '../third-page/third-page.component';
import { Universal } from '../universal';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private service: GetFunctionsService, private postService:PostFunctionService) { }
  ngOnInit(): void {
    this.getContacts();
    this.getContractors();
    this.getEngineers();
    this.getOwners();
    this.getAllProjects();
  }
  public new:boolean = false;
  public existing:boolean = true;
  public manage:boolean = false;
  allProjects:ProjectWithDetails[]=[];

  newproj(){
    this.new = true;
    this.existing = false;
    this.manage = false;
  }
  exist(){
    this.new = false;
    this.existing = true;
    this.manage = false;
  }
  mng(){
    this.new = false;
    this.existing = false;
    this.manage = true;
  }

  getAllProjects(){
    return this.service.getProjectsByEmail().subscribe(data=> this.allProjects = data);
  }

  // start(){
  //   this.router.navigateByUrl('navigator');
  // }
  // @ViewChild(FirstPageComponent) firstpage:FirstPageComponent = new FirstPageComponent(this.router, this.service, this.postService);
  // @ViewChild(SecondPageComponent) secondpage:SecondPageComponent = new SecondPageComponent(this.router, this.service, this.postService);
  // @ViewChild(ThirdPageComponent) thirdpage:ThirdPageComponent = new ThirdPageComponent(this.router, this.service, this.postService);
  // @ViewChild(FourthPageComponent) fourthpage:FourthPageComponent = new FourthPageComponent(this.router, this.service, this.postService);
  // @ViewChild(FifthPageComponent) fifthpage:FifthPageComponent = new FifthPageComponent(this.router, this.service, this.postService);
  // @ViewChild(SixthPageComponent) sixthpage:SixthPageComponent = new SixthPageComponent(this.router, this.service, this.postService);

  details:Details={
    name: '',
    email:'admin@admin.com',
    reforderno:'',
    address:'',
    city:'',
    country:'',
    state:'',
    zip:'',
    primarycontact:'',
    engarch:'',
    owner:'',
    contractor:'',
    status:'',
    type:'',
    design:''
  }
    countryes: string[]=[
      "USA",
      "Canada"
    ]
    contacts: People[]=[]
    engs:People[]=[]
    owner:People[]=[]
    contractor:People[]=[]

    getContacts(){
      this.service.getContacts().subscribe(data => this.contacts = data);
    }
    getContractors(){
      this.service.getContractors().subscribe(data => this.contractor = data);
    }
    getEngineers(){
      this.service.getEngineers().subscribe(data => this.engs = data);
    }
    getOwners(){
      this.service.getOwners().subscribe(data => this.owner = data);
    }
    canadaStates:string[]=[
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon",
    ]
     americaStates:string[] = [
      "AK - Alaska", 
      "AL - Alabama", 
      "AR - Arkansas", 
      "AS - American Samoa", 
      "AZ - Arizona", 
      "CA - California", 
      "CO - Colorado", 
      "CT - Connecticut", 
      "DC - District of Columbia", 
      "DE - Delaware", 
      "FL - Florida", 
      "GA - Georgia", 
      "GU - Guam", 
      "HI - Hawaii", 
      "IA - Iowa", 
      "ID - Idaho", 
      "IL - Illinois", 
      "IN - Indiana", 
      "KS - Kansas", 
      "KY - Kentucky", 
      "LA - Louisiana", 
      "MA - Massachusetts", 
      "MD - Maryland", 
      "ME - Maine", 
      "MI - Michigan", 
      "MN - Minnesota", 
      "MO - Missouri", 
      "MS - Mississippi", 
      "MT - Montana", 
      "NC - North Carolina", 
      "ND - North Dakota", 
      "NE - Nebraska", 
      "NH - New Hampshire", 
      "NJ - New Jersey", 
      "NM - New Mexico", 
      "NV - Nevada", 
      "NY - New York", 
      "OH - Ohio", 
      "OK - Oklahoma", 
      "OR - Oregon", 
      "PA - Pennsylvania", 
      "PR - Puerto Rico", 
      "RI - Rhode Island", 
      "SC - South Carolina", 
      "SD - South Dakota", 
      "TN - Tennessee", 
      "TX - Texas", 
      "UT - Utah", 
      "VA - Virginia", 
      "VI - Virgin Islands", 
      "VT - Vermont", 
      "WA - Washington", 
      "WI - Wisconsin", 
      "WV - West Virginia", 
      "WY - Wyoming"
    ]
    changecountry(){
      if(this.details.country == 'USA'){
        this.states = this.americaStates;
      }else{
        this.states = this.canadaStates;
      }
    }
    states:string[]=[];
    /*
    name: '',
    reforderno:'',
    address:'',
    city:'',
    country:'',
    state:'',
    zip:'',
    primarycontact:'',
    engarch:'',
    owner:'',
    contractor:'',
    status:'',
    type:'',
    design:''
    */
    createNewProject(){
      if(this.details.name == '' ||
        this.details.reforderno == '' ||
        this.details.address == '' ||
        this.details.city == '' ||
        this.details.country == '' ||
        this.details.state == '' ||
        this.details.zip == '' ||
        this.details.primarycontact == '' ||
        this.details.engarch == '' ||
        this.details.owner == '' ||
        this.details.contractor == ''
        ){
          alert('You must fill each field')
        }
        
        else{         
          // this.postService.createNewProject(this.details).subscribe(data => {
          //   this.service.id = data;
          //   this.goToProject(this.service.id,this.service.title) 
          // });
          this.postService.createNewProject(this.details).subscribe(data => this.service.id = data);
        }
    }
   

    delete(id:number){
      if(confirm('Are you sure you want to delete this project? This action cannot be undone')){
        this.postService.deletebyid(id).subscribe(() => console.log("done"));
        window.location.reload();
      }
    }

    goToProject(id:number, title:string){
      this.service.id=id;
      this.service.title = title;
      this.service.getPage1(this.service.id).subscribe(data => this.service.project.p1 = data);
      this.service.getPage2(this.service.id).subscribe(data => this.service.project.p2 = data);
      this.service.getPage4(this.service.id).subscribe(data => this.service.project.p4 = data);
      this.service.getPage5(this.service.id).subscribe(data => this.service.project.p5 = data);
      this.service.getPage6(this.service.id).subscribe(data => this.service.project.p6 = data);
      this.router.navigateByUrl('navigator');
    }
}
