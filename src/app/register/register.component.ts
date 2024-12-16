import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

import * as bcrypt from 'bcryptjs'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form:FormGroup
  emailTaken = false
  passwordMatch:boolean = true
  passwordLength:boolean = true
  constructor(private us:UsersService, private router:Router) {
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[Validators.required]),
      confirm_password: new FormControl('',[Validators.required])
    }
    this.form = new FormGroup(formControls)
  }

  async onSubmit(newReg:any) {
    if (this.us.findUser(newReg.email) !== undefined) {
      this.emailTaken = true
    } else {
      if (newReg.password === newReg.confirm_password && newReg.password.length >= 8) {
        this.passwordMatch = true
        this.passwordLength = true
        newReg.password = await bcrypt.hash(newReg.password,12)
        let newUser = new User(newReg.email, newReg.password, false)
        this.us.addUser(newUser)
        this.router.navigate(['/login'])
      } else {
        if (newReg.password.length < 8 || newReg.password.length > 128) {
          this.passwordLength = false
        } else {
          this.passwordLength = true
          if (newReg.password !== newReg.confirm_password) {
            this.passwordMatch = false
          }
        }
      }
    }
  }
}