import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FifthPageComponent } from '../fifth-page/fifth-page.component';
import { FirstPageComponent } from '../first-page/first-page.component';
import { FourthPageComponent } from '../fourth-page/fourth-page.component';
import { Details } from '../models/details.model';
import { ProjectWithDetails } from '../models/totalproject.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { SecondPageComponent } from '../second-page/second-page.component';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';
import { SixthPageComponent } from '../sixth-page/sixth-page.component';
import { ThirdPageComponent } from '../third-page/third-page.component';
import { Universal } from '../universal';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private service: GetFunctionsService, private postService:PostFunctionService) { }
  ngOnInit(): void {
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
    contacts: string[]=[
      "Contact 1",
      "Contact 2",
      "Contact 3"
    ]
    engs:string[]=[
      "Arch 1",
      "Arch 2",
      "Arch 3"
    ]
    owner:string[]=[
      "Owner 1",
      "Owner 2",
      "Owner 3"
    ]
    contractor:string[]=[

    ]
    createNewProject(){
      this.postService.createNewProject(this.details).subscribe(data => this.details = data);
      window.location.reload();
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
