import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

declare var Dropbox: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'music-player-app';
  constructor(private us:UsersService) {}
  ngOnInit(): void {
    this.us.getUsers()
  }
}
