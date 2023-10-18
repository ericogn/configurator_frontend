import { Directive, ElementRef, HostListener, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './login/login.component';
import { FourthPageComponent } from './fourth-page/fourth-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubtotalComponent } from './subtotal/subtotal.component';
import { FifthPageComponent } from './fifth-page/fifth-page.component';
import { SixthPageComponent } from './sixth-page/sixth-page.component';
import { SeventhPageComponent } from './seventh-page/seventh-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { NavigatorComponent } from './navigator/navigator.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCardComponent } from './project-card/project-card.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { GetFunctionsService } from './services/getfunctions.service';


@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    SecondPageComponent,
    NavbarComponent,
    ThirdPageComponent,
    LoginComponent,
    FourthPageComponent,
    MainMenuComponent,
    SubtotalComponent,
    FifthPageComponent,
    SixthPageComponent,
    SeventhPageComponent,
    NavigatorComponent,
    ProjectCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatProgressBarModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    //CurrencyMaskModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, GetFunctionsService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

