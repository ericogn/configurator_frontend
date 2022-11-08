import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }

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
