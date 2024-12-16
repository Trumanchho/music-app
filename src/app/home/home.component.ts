import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../Book';
import { UsersService } from '../users.service';
import { User } from '../User';
import { Router } from '@angular/router';
import { SongsService } from '../songs.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  query:string = ''
  books:Book[]
  currentUser:User
  loggedIn:boolean
  wait = true
  constructor(private bs:BooksService, private us:UsersService, private ss:SongsService, private router:Router, private http:HttpClient) {
    this.books = this.bs.books
    this.currentUser = this.us.currentUser
    this.loggedIn = this.us.loggedIn
  }
  async ngOnInit(): Promise<void> {
    if (Object.keys(this.ss.songData).length === 0) {
      this.ss.songData = await this.http.get('/api/songs').toPromise()
      this.ss.instrumentalData = await this.http.get('/api/instrumentals').toPromise()
      this.wait = false
    } else {
      this.wait = false
    } 
  }

  logout() {
    this.us.loggedIn = false
    this.router.navigate(["/login"])
  }
}
