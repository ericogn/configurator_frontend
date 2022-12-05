import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Credentials } from "../models/credentials.model";
import { Details } from "../models/details.model";
import { LoginResponse } from "../models/loginresponse.model";
import { Page1 } from "../models/page1.model";
import { Page2 } from "../models/page2.model";
import { Page4 } from "../models/page4.model";
import { Page5 } from "../models/page5.model";
import { Page6 } from "../models/page6.model";

@Injectable({
    providedIn:'root'
})

export class PostFunctionService{

    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    private baseUrl = `${environment.apiUrl}`;

    constructor (private http: HttpClient){

    }

    updatePage1(page1:Page1,id:number){
        return this.http.post<Page1>(`${this.baseUrl}page1/updatepage1.php?details=${id}`,page1,this.httpOptions);
    }
    updatePage2(page2:Page2,id:number){
        return this.http.post<Page2>(`${this.baseUrl}page2/updatepage2.php?details=${id}`,page2,this.httpOptions);
    }
    updatePage4(page4:Page4,id:number){
        return this.http.post<Page4>(`${this.baseUrl}page4/updatepage4.php?details=${id}`,page4,this.httpOptions);
    }
    updatePage5(page5:Page5,id:number){
        return this.http.post<Page5>(`${this.baseUrl}page5/updatepage5.php?details=${id}`,page5,this.httpOptions);
    }
    updatePage6(page6:Page6,id:number){
        return this.http.post<Page6>(`${this.baseUrl}page6/updatepage6.php?details=${id}`,page6,this.httpOptions);
    }
    createNewProject(details:Details){
        return this.http.post<number>(`${this.baseUrl}details/createnewproject.php`,details,this.httpOptions);
    }

    deletebyid(id:number){
        return this.http.post(`${this.baseUrl}projectsaver/deleteproject.php?details=${id}`,this.httpOptions)
    }

    login(credential:Credentials){
        return this.http.post<LoginResponse>(`${this.baseUrl}user/login.php`,credential,this.httpOptions);
    }

}