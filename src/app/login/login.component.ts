import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup
  passwordMatch:boolean = true
  emailFound:boolean = true
  constructor(private us:UsersService, private router:Router) {
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[Validators.required])
    }
    this.form = new FormGroup(formControls)
  }

  ngOnInit(): void {
    
  }

  async onSubmit(newLogin:any) {
    let user = this.us.findUser(newLogin.email)
    if (user !== undefined) {
      user = <User>user
      if (await user.checkPassword(newLogin.password) ) {
        this.us.currentUser = user
        this.us.loggedIn = true
        this.router.navigate(['/books'])
      } else {
        this.passwordMatch = false
      }
    } else {
      this.emailFound = false
    }
  }
}