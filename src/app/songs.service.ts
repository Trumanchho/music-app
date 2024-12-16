import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SongsService {
  songData:any = {}
  instrumentalData:any = {}
  songs:any[] = []
  dbx:any
  constructor(private af:AngularFireStorage, private http:HttpClient) {
  }

  /*
    CURRENT BOOKS
    Songs of Love 1
    Songs of Love 2
    God's Family Hymnal 2
    Hymnal Collection 2023
    Hymnal Collection 2024
    Songs of My Heart 1 (Instrumental)
  */ 

  async getSongs(title:string) {
    this.songs = []
    if (title === "All Songs") {

      this.songs = this.songs.concat(this.songData['sol1'])
      this.songs = this.songs.concat(this.songData['sol2'])
      this.songs = this.songs.concat(this.songData['gfh2'])
      this.songs = this.songs.concat(this.songData['hc23'])
      this.songs = this.songs.concat(this.songData['hc24'])
    } else if (title === "All Instrumentals") {
      this.songs = this.songs.concat(this.instrumentalData['sol1'])
      this.songs = this.songs.concat(this.instrumentalData['sol2'])
      this.songs = this.songs.concat(this.instrumentalData['hc23'])
      this.songs = this.songs.concat(this.instrumentalData['somh1'])
    } else if (title === "Songs of Love 1" ) {
      this.songs = this.songData['sol1']
    } else if  (title === "Hymnal Collection 2023" ) {
      this.songs = this.songData['hc23']
    } else if  (title === "Hymnal Collection 2023 (Instrumental)" ) {
      this.songs = this.instrumentalData['hc23']
    } else if  (title === "God's Family Hymnal 2" ) {
      this.songs = this.songData['gfh2']
    } else if  (title === "Songs of Love 2" ) {
      this.songs = this.songData['sol2']
    } else if  (title === "Songs of My Heart 1 (Instrumental)" ) {
      this.songs = this.instrumentalData['somh1']
    } else if  (title === "Songs of Love 1 (Instrumental)" ) {
      this.songs = this.instrumentalData['sol1']
    } else if  (title === "Songs of Love 2 (Instrumental)" ) {
      this.songs = this.instrumentalData['sol2']
    } else if (title === "Hymnal Collection 2024" ) {
      this.songs = this.songData['hc24']
    } else if (title === "All Demo Songs") {
      this.songs = this.songs.concat(this.songData['hymninstrumentals'])
    } else if (title === "Demo Hymn Instrumentals") {
      this.songs = this.songData['hymninstrumentals']
    }
    return this.songs
  }

  sortSongs(option:string) {
    if (option === "shuffle") {
      for (let i = this.songs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this.songs[i];
        this.songs[i] = this.songs[j];
        this.songs[j] = temp;
      }
    } else if (option === "page") {
      this.songs = this.songs.sort(this.comparePage)
    } else if (option === "name") {
      this.songs = this.songs.sort(this.compareName)
    }
  }

  comparePage( a:any, b:any ) {
    if ( Number(a.name.split("-")[0]) < Number(b.name.split("-")[0]) ){
      return -1;
    }
    if (  Number(a.name.split("-")[0]) > Number(b.name.split("-")[0]) ){
      return 1;
    }
    return 0;
  }
  compareName( a:any, b:any ) {
    if ( a.name.split("-")[1].trim() < b.name.split("-")[1].trim() ){
      return -1;
    }
    if (  a.name.split("-")[1].trim() > b.name.split("-")[1].trim() ){
      return 1;
    }
    return 0;
  }
}


