import { Component, Input } from '@angular/core';
import { SongsService } from '../songs.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  @Input() book:string = ""
  @Input() bookUrl:string = ""
  constructor(private ss:SongsService, private router:Router) {}

  goToPlayer() {
    this.router.navigate(["books/player", this.book])
  }

}
