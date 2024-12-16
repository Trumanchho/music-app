import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {faAngleLeft, faBars, faMusic, faPlay, faForwardStep, faBackwardStep, faPause, faXmark, faShuffle, faArrowDownAZ, faArrowDown19} from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute, Router } from '@angular/router'
import { SongsService } from '../songs.service';
import { BooksService } from '../books.service';
import { UsersService } from '../users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnDestroy, OnInit {
  faAngleLeft = faAngleLeft
  faBars = faBars
  faMusic = faMusic
  faPlay = faPlay
  faPause = faPause
  faForwardStep = faForwardStep
  faBackwardStep = faBackwardStep
  faXmark = faXmark
  faShuffle = faShuffle
  faArrowDownAZ = faArrowDownAZ
  faArrowDown19 = faArrowDown19
  listIcon = faBars
  playIcon = faPlay

  init:boolean = false
  @ViewChild('progress') progress:any
  song:any
  showAudio = true
  isPlaying = false
  songIndex:number = 0
  songCurrentTime:number = 0
  songs:any[] = []
  songName:string = ''
  filename:any
  bookName:string = this.ActivatedRoute.snapshot.params["title"]
  bookImageUrl:string
  shuffleOption:string = "shuffle"

  query:string = ''

  wait:boolean = true
  listOpened:boolean = false
  hideList = false
  countInterval:any
  loggedIn:boolean
  verified:boolean

  dbx:any

  constructor(private ss:SongsService, private bs:BooksService, private us:UsersService,
              private http:HttpClient, private ActivatedRoute:ActivatedRoute, private router:Router) {

    this.loggedIn = this.us.loggedIn
    this.verified = this.us.currentUser.verified
    if (this.loggedIn && this.verified) {
      this.bookImageUrl =  this.bs.getBook(this.bookName).imageUrl
    } else {
      this.bookImageUrl = this.bs.getDemoBook(this.bookName).imageUrl
    }
  }

  async ngOnInit(): Promise<void> {
    //console.log("new version")
    this.songs = await this.ss.getSongs(this.bookName)
    this.songs = this.songs.sort((a, b) => 0.5 - Math.random())
    this.songName = this.songs[this.songIndex].name
    //console.log('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>'))
    this.filename = await this.http.get('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>')).toPromise()
    this.song = new Audio(this.filename.link)
    this.wait = false
  }

  ngOnDestroy(): void {
    clearInterval(this.countInterval)
    this.song.pause()
    this.song.src = ''
    this.song.load()
    delete this.song
  }

  playPause() {
    if (this.init === false) {
      this.changeSliderPos()
    } else {
      if (this.isPlaying === true) {
        this.song.pause()
        this.isPlaying = false
        this.playIcon = faPlay
      } else {
        this.song.play()
        this.isPlaying = true
        this.playIcon = faPause
      }
    }
    
  }
  async playNext() {
    this.changeSliderPos()
    this.progress.nativeElement.min = 0
    this.progress.nativeElement.value = 0
    this.songIndex++
    this.songIndex %= this.songs.length
    this.songName = this.songs[this.songIndex].name
    this.filename = await this.http.get('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>')).toPromise()
    this.song.src = this.filename.link
    setTimeout(()=>{
      this.song.play()
    },1000)
  }
  async playPrev() {
    this.changeSliderPos()
    this.songIndex--
    if (this.songIndex < 0) {
      this.songIndex = this.songs.length -1
    }
    this.songName = this.songs[this.songIndex].name
    this.filename = await this.http.get('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>')).toPromise()
    this.song.src = this.filename.link
    setTimeout(()=>{
      this.progress.nativeElement.value = this.song.currentTime
      this.song.play()
    },500)
  }

  moveSlider() {
    if (this.song.play()) {
      this.countInterval = setInterval(()=> {
        this.progress.nativeElement.value = this.song.currentTime
        this.songCurrentTime = this.song.currentTime
        if (this.song.currentTime >= Math.floor(this.song.duration)) {
          this.progress.nativeElement.value = 0;
          this.playNext()
        }
      },500)
    }
  }

  changeSliderPos() {
    if (this.init === false) {
      this.progress.nativeElement.value = this.song.currentTime
      this.moveSlider()
      this.init = true
    }
    this.isPlaying = true
    this.playIcon = faPause
    this.song.play()
    this.song.currentTime = this.progress.nativeElement.value
  }

  backToHome() {
    this.router.navigate(["/books"])
  }

  openCloseList() {
    if (this.listOpened) {
      this.listIcon = faBars
    } else {
      this.listIcon = faXmark
    }
    this.listOpened = !(this.listOpened)
  }

  onTintClick() {
    if (this.listOpened) {
      this.openCloseList()
    }
  }

  async goToSong(songName:string) {
    if (this.listOpened) {
      this.openCloseList()
    }
    if (this.songName !== songName) {
      this.changeSliderPos()
      this.isPlaying = true
      this.playIcon = faPause
      this.songIndex = this.songs.map(e => e.name).indexOf(songName)
      this.songName = songName
      this.filename = await this.http.get('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>')).toPromise()
      this.song.src = this.filename.link
      setTimeout(()=>{

        this.progress.nativeElement.value = this.song.currentTime
        this.song.play()
      },500)
    } else {
      if (!this.isPlaying) {
        this.playPause()
      }
    }
  }

  shuffleSongs() {
    this.shuffleOption = "shuffle"
    this.ss.sortSongs("shuffle")
    this.songIndex = -1
    this.songs = this.ss.songs
    this.refreshList()
    this.goToSong(this.songs[0].name)
  }
  sortByPageSongs() {
    if (this.shuffleOption !== "page") {
      this.shuffleOption = "page"
      this.ss.sortSongs("page")
      this.songs = this.ss.songs
      this.refreshList()
      this.goToSong(this.songs[0].name)
    }
  }
  sortByNameSongs() {
    if (this.shuffleOption !== "name") {
      this.shuffleOption = "name"
      this.ss.sortSongs("name")
      this.songs = this.ss.songs
      this.refreshList()
      this.goToSong(this.songs[0].name)
    }
  }
  refreshList() {
    this.hideList = true
    setTimeout(()=>{
      this.hideList = false
    },100)
  }

}



