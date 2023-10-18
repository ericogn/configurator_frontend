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

  constructor(private router: Router, public service: GetFunctionsService, private postService:PostFunctionService) { }
  ngOnInit(): void {
    this.service.email = this.service.getLocalStorage("email");
    this.service.company = this.service.getLocalStorage("company");
    this.service.name = this.service.getLocalStorage("name");
    this.getContacts();
    this.getContractors();
    this.getEngineers();
    this.getOwners();
    this.getAllProjects(this.service.getLocalStorage("email"));
  }
  public new:boolean = false;
  public existing:boolean = true;
  public manage:boolean = false;

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

  getAllProjects(email:string){
    return this.service.getProjectsByEmail(email).subscribe(data=> this.service.allProjects = data);
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
    email:'',
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
    contacts: People[]=[
      {
        name:"To be Added"
      }
    ]
    engs:People[]=[
      {
        name:"To be Added"
      }
    ]
    owner:People[]=[
      {
        name:"To be Added"
      }
    ]
    contractor:People[]=[
      {
        name:"To be Added"
      }
    ]

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
      "Alaska", 
      "Alabama", 
      "Arkansas", 
      "American Samoa", 
      "Arizona", 
      "California", 
      "Colorado", 
      "Connecticut", 
      "District of Columbia", 
      "Delaware", 
      "Florida", 
      "Georgia", 
      "Guam", 
      "Hawaii", 
      "Iowa", 
      "Idaho", 
      "Illinois", 
      "Indiana", 
      "Kansas", 
      "Kentucky", 
      "Louisiana", 
      "Massachusetts", 
      "Maryland", 
      "Maine", 
      "Michigan", 
      "Minnesota", 
      "Missouri", 
      "Mississippi", 
      "Montana", 
      "North Carolina", 
      "North Dakota", 
      "Nebraska", 
      "New Hampshire", 
      "New Jersey", 
      "New Mexico", 
      "Nevada", 
      "New York", 
      "Ohio", 
      "Oklahoma", 
      "Oregon", 
      "Pennsylvania", 
      "Puerto Rico", 
      "Rhode Island", 
      "South Carolina", 
      "South Dakota", 
      "Tennessee", 
      "Texas", 
      "Utah", 
      "Virginia", 
      "Virgin Islands", 
      "Vermont", 
      "Washington", 
      "Wisconsin", 
      "West Virginia", 
      "Wyoming"
    ]
    changecountry(){
      if(this.details.country == 'USA'){
        this.states = this.americaStates;
        this.details.state = 'Alaska';
      }else{
        this.states = this.canadaStates;
        this.details.state = 'Alberta';
      }
    }
    states:string[]=[];
    
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
          this.details.email = this.service.email;
          this.postService.createNewProject(this.details).subscribe(data => {
            this.service.id = data;
            window.location.reload();
            //this.goToProject(data,'');
            //this.goToNewProject(data);
          });
          if(this.service.allProjects.length <= 1){
            window.location.reload();
          }
          this.getAllProjects(this.details.email);
          this.existing = true;
          this.new = false;
          //this.router.navigateByUrl('navigator');
        }
    }
   
    test(){
      this.details.email = this.service.email;
      
    }

    delete(id:number){
      if(confirm('Are you sure you want to delete this project? This action cannot be undone')){
        this.postService.deletebyid(id).subscribe(() => console.log("done"));
        
        this.service.getProjectsByEmail(this.service.email).subscribe(data=> this.service.allProjects = data);
        if(this.service.allProjects.length <= 1){
          //window.location.reload();
        }
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
      this.service.setLocalStorage("id",this.service.id);
      this.service.setLocalStorage("projectname",title);
      this.router.navigateByUrl('navigator');
    }

    goToNewProject(id:number){
      this.service.id=id;
      this.router.navigateByUrl('navigator');
    }
}
