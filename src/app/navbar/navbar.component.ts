import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, public service:GetFunctionsService, private postService: PostFunctionService) { }
  ngOnInit(): void {
    this.service.title = this.service.getLocalStorage("projectname");

  }
  @ViewChild(MainMenuComponent) mainmenu=new MainMenuComponent(this.router, this.service,this.postService);
  
  title:string = this.service.title;
  projects(){
    this.router.navigateByUrl('mainmenu')
  }
  accountSettings(){
    this.router.navigateByUrl('mainmenu');
  }
  logoff(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
