import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FifthPageComponent } from './fifth-page/fifth-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { FourthPageComponent } from './fourth-page/fourth-page.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { SeventhPageComponent } from './seventh-page/seventh-page.component';
import { SixthPageComponent } from './sixth-page/sixth-page.component';
import { SubtotalComponent } from './subtotal/subtotal.component';
import { ThirdPageComponent } from './third-page/third-page.component';

const routes: Routes = [
  {
    path:'', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'mainmenu', component:MainMenuComponent, canActivate:[AuthGuard]
  },
  {
    path:'navigator', component:NavigatorComponent, canActivate:[AuthGuard]
  },
  {
    path: 'secondpage', component: SecondPageComponent
  },
  {
    path: 'thirdpage', component:ThirdPageComponent
  },
  {
    path:'fourthpage', component:FourthPageComponent
  },
  {
    path:'fifthpage', component:FifthPageComponent
  },
  {
    path:'sixthpage',component:SixthPageComponent
  },
  {
    path:'seventhpage', component:SeventhPageComponent
  },
  {
    path:'subtotal', component: SubtotalComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
})

export class AppRoutingModule {

 }
