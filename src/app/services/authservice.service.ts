import { Injectable } from '@angular/core';
import { GetFunctionsService } from './getfunctions.service';
	

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  getLocalStorage(key:string):any{
    if(typeof window != 'undefined'){
        const value = localStorage.getItem(key) as string;
        return JSON.parse(value);
    }  
}

  isLoggedIn() {
        
	    const token = this.getLocalStorage('token');
        // get token from local storage
	   
        const payload = atob(token.split('.')[1]); 
       // decode payload of token
	   
       const parsedPayload = JSON.parse(payload); 
       // convert payload into an Object

       if(token == null){
        return false;
       }else

       return parsedPayload.exp > Date.now() / 1000; // check if token is expired
	
	  }
	

	}