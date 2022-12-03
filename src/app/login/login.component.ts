import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGainedToken } from '../models/UserGainedToken.model';
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

  loginRegister:boolean = false;
  login(){
    this.loginRegister=false;
    console.log(this.loginRegister)
  }
  
  register(){
    this.loginRegister=true;
  }
  token:UserGainedToken[]=[];
  test(){
    console.log(this.token);
  }
  done(){
    this.login();
  }
  enter(){
    if(this.usr == "asd" && this.pas=="asd"){
      this.router.navigateByUrl('mainmenu');
    }
    else{
      alert("Wrong username or password")
    }
  }
}
