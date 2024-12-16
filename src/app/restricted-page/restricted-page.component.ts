import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css']
})
export class RestrictedPageComponent implements OnInit { 
  message:string = ''
  loggedIn:boolean = true
  constructor(private us:UsersService, private router:Router) {}

  ngOnInit(): void {

  }

  goToBooks() {
    this.router.navigate(['/books'])
  }
  goToLogin() {
    this.router.navigate(['/login'])
  }
 }
