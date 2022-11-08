import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetFunctionsService } from '../services/getfunctions.service';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-fifth-page',
  templateUrl: './fifth-page.component.html',
  styleUrls: ['./fifth-page.component.scss']
})
export class FifthPageComponent implements OnInit {

  constructor(private router: Router, private service: GetFunctionsService, private postService:PostFunctionService) { }

  ngOnInit(): void {
  }
  prevPage(){
    this.router.navigateByUrl('fourthpage');
  }
  nextPage(){
    this.router.navigateByUrl('sixthpage');
  }

  updatePage5(){
    
  }
}
