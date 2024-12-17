import { Injectable } from '@angular/core';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books:Book[] = []
  demoBooks:Book[] = []
  constructor() { 
    this.books.push(new Book("All Songs", '/assets/allsongs.jpg'))
    this.books.push(new Book("All Instrumentals", '/assets/allsongs.jpg'))
    this.books.push(new Book("Songs of Love 1", '/assets/SOL1.jpg'))
    this.books.push(new Book("Songs of Love 1 (Instrumental)", '/assets/SOL1.jpg'))
    this.books.push(new Book("Songs of Love 2", '/assets/SOL2.jpg'))
    this.books.push(new Book("Songs of Love 2 (Instrumental)", '/assets/SOL2.jpg'))
    // this.books.push(new Book("Songs of Love 3", '/assets/SOL3.jpg'))
    // this.books.push(new Book("God's Family Hymnal 1", '/assets/GFH1.jpg'))
    this.books.push(new Book("God's Family Hymnal 2", '/assets/GFH2.jpg'))
    // this.books.push(new Book("God's Beautiful Heart", '/assets/GBH.jpg'))
    // this.books.push(new Book("Songs of My Heart 1", '/assets/SOMH1.jpg'))
    this.books.push(new Book("Hymnal Collection 2023", '/assets/hymnalcollection.jpg'))
    this.books.push(new Book("Hymnal Collection 2023 (Instrumental)", '/assets/hymnalcollection.jpg'))
    this.books.push(new Book("Songs of My Heart 1 (Instrumental)", '/assets/SOMH1.jpg'))
    this.books.push(new Book("Hymnal Collection 2024", '')) //need cover image for this

    //DEMO
    this.demoBooks.push(new Book("All Demo Songs", '/assets/record-player.jpg'))
    this.demoBooks.push(new Book("Demo Hymn Instrumentals", '/assets/hymnal-open.jpg'))
    this.demoBooks.push(new Book("Guitar Covers", '/assets/guitar-painting-image.jpg'))
  }

  getBook(name:string) :Book {
    return this.books.filter((b) => b.name === name)[0]
  }
  getDemoBook(name:string) :Book {
    return this.demoBooks.filter((b) => b.name === name)[0]
  }
}
