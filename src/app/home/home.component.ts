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
  title = ""
  constructor(private bs:BooksService, private us:UsersService, private ss:SongsService, private router:Router, private http:HttpClient) {
    this.loggedIn = this.us.loggedIn
    if (this.loggedIn && this.us.currentUser.verified) {
      this.title = "Bookshelf"
      this.books = this.bs.books
      this.currentUser = this.us.currentUser
    } else {
      this.title = "Bookshelf (DEMO)"
      this.books = this.bs.demoBooks
      if (!this.loggedIn) {
        this.currentUser = new User('DEMO','DEMO',false)
      } else {
        this.currentUser = this.us.currentUser
      }
    }
    
    
  }
  async ngOnInit(): Promise<void> {
    
    if (Object.keys(this.ss.songData).length === 0) {
      if (this.loggedIn && this.currentUser.verified) {
        this.ss.songData = await this.http.get('/api/songs').toPromise()
        this.ss.instrumentalData = await this.http.get('/api/instrumentals').toPromise()
        this.wait = false
      } else {
        this.ss.songData = await this.http.get('/api/demo-songs').toPromise()
        this.wait = false
      }
    } else {
      this.wait = false
    } 
  }

  logout() {
    this.us.loggedIn = false
    this.loggedIn = false
    this.router.navigate(["/login"])
    this.ss.songData = {}
  }
}
