import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { Credentials } from '../models/credentials.model';
import { LoginResponse } from '../models/loginresponse.model';
import { NavigatorComponent } from '../navigator/navigator.component';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private service:GetFunctionsService, private postservice:PostFunctionService) { }

  ngOnInit(): void {
  }
  usr:string='';
  pas: string='';

  credential:Credentials={
    email:'',
    password:''
  }
  enter(){

    this.credential.email = this.usr;
    this.credential.password = this.pas;
    this.postservice.login(this.credential).subscribe(
      data => {
        if(data.success == 1){
          this.getAllProjects(data.email);
          this.login(data);
        }
        else{
          alert("Wrong username or password");
        }
      }
    )
    // if(this.usr == "asd" && this.pas=="asd"){
    //   this.router.navigateByUrl('mainmenu');
    // }
    // else{
    //   alert("Wrong username or password")
    // }
  }
  getAllProjects(email:string){
    return this.service.getProjectsByEmail(email).subscribe(data=> this.service.allProjects = data);
  }

  login(token:LoginResponse){
    this.service.email = token.email;
    this.service.lastProjectId = token.lastproject;
    this.service.company = token.company;
    this.service.name = `${token.firstname} ${token.lastname}`;

    if(token.lastproject != 0){
      this.service.id = token.lastproject;
      this.goToProject(token.lastproject);
    }else{
      this.router.navigateByUrl('mainmenu');
    }
  }



  goToProject(id:number){
    this.service.id=id;
    this.service.getPage1(id).subscribe(data => this.service.project.p1 = data);
    this.service.getPage2(id).subscribe(data => this.service.project.p2 = data);
    this.service.getPage4(id).subscribe(data => this.service.project.p4 = data);
    this.service.getPage5(id).subscribe(data => this.service.project.p5 = data);
    this.service.getPage6(id).subscribe(data => this.service.project.p6 = data);
    this.router.navigateByUrl('navigator');
  }
}
