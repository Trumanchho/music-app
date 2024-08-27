import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrl: './restricted-page.component.css'
})
export class RestrictedPageComponent implements OnInit { 
  message:string = ''
  loggedIn:boolean = true
  constructor(private us:UsersService, private router:Router) {}

  ngOnInit(): void {
    if (!this.us.loggedIn) {
      this.loggedIn = false
      this.message = "Please log in to play songs."
    } else if (!this.us.currentUser.verified) {
      this.message = "Your account is waiting to be verified. You may need to <b>refresh the page</b> once you are verified. Thank you for your patience."
    }
  }

  goToBooks() {
    this.router.navigate(['/books'])
  }
  goToLogin() {
    this.router.navigate(['/login'])
  }
 }
