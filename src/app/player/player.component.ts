import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {faAngleLeft, faBars, faMusic, faPlay, faForwardStep, faBackwardStep, faPause, faXmark, faShuffle, faArrowDownAZ, faArrowDown19, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
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
  faPlus = faPlus
  faMinus = faMinus

  init:boolean = false
  @ViewChild('progress') progress:any
  song:any
  showAudio = true
  isPlaying = false
  songIndex:number = 0
  songCurrentTime:number = 0
  songs:any[] = []
  queue:any[] = []
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

  queueOpened:boolean = false
  addingToQ:boolean = false

  showNotif:boolean = false
  notifMessage:string = ""
  notifTimer:any

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
    if (this.songs == undefined || this.songs[0] == undefined) {
      this.router.navigate(["/books"])
    } else {
      this.songName = this.songs[this.songIndex].name
      //console.log('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>'))
      this.filename = await this.http.get('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>')).toPromise()
      this.song = new Audio(this.filename.link)
      this.wait = false
    }
  }

  ngOnDestroy(): void {
    if (this.songs == undefined || this.songs[0] == undefined) {
      this.router.navigate(["/books"])
      return
    }
    clearInterval(this.countInterval)
    this.song.pause()
    this.song.src = ''
    this.song.load()
    delete this.song
  }

  backToHome() {
    this.router.navigate(["/books"])
  }

  openQueue() {
    if (this.addingToQ) {
      this.addingToQ = false
    }
    if (this.queueOpened) {
      this.queueOpened = false
    } else {
      this.queueOpened = true
    }
  }
  addingToQueue() {
    if (this.queueOpened) {
      this.queueOpened = false
    }
    if (this.addingToQ) {
      this.addingToQ = false
    } else {
      this.addingToQ = true
    }
  }

  enqueueSong(songName:string) {
    if (this.queue.filter(song=>song.name === songName).length === 0) {
      if (this.queue.push(this.songs.find(song=>song.name === songName))) {
        songName = songName.split('-')[1].replace(".mp3","").replace(".m4a","")
        let msg = "Added \"" + songName + "\" to queue."
        this.notif(msg)
      }
    } else {
      let msg = "Song has already been queued."
      this.notif(msg)
    }
  }
  removeSong(songName:string) {
   this.queue = this.queue.filter(song=>song.name !== songName)
   songName = songName.split('-')[1].replace(".mp3","").replace(".m4a","")
   let msg = "Removed \"" + songName + "\" from queue."
   this.notif(msg)
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
    if (this.queue.length > 0) {
      this.songName = this.queue[0].name
      this.songIndex = this.songs.findIndex(song => song.name === this.songName)
      this.filename = await this.http.get('/api/link?filepath=' + this.queue[0].path_display.replace(new RegExp('/', 'g'), '<>')).toPromise()
      this.song.src = this.filename.link
      this.queue.shift()
    } else {
      this.songIndex++
      this.songIndex %= this.songs.length
      this.songName = this.songs[this.songIndex].name
      this.filename = await this.http.get('/api/link?filepath=' + this.songs[this.songIndex].path_display.replace(new RegExp('/', 'g'), '<>')).toPromise()
      this.song.src = this.filename.link
    }
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
    if (this.addingToQ || this.queueOpened) {
      return
    }
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
  notif(message:string) {
    this.notifMessage = message
    this.showNotif = true
    if (this.notifTimer) {
      clearTimeout(this.notifTimer)
    }
    this.notifTimer = setTimeout(()=>{
      this.showNotif = false
    },2000)
  }

}



