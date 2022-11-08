import { Component, OnInit } from '@angular/core';
import { Details } from '../models/details.model';
import { PostFunctionService } from '../services/postfunctions.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  constructor(private service:PostFunctionService) { }


  ngOnInit(): void {

  }

  
}
