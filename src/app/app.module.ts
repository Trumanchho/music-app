import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayerComponent } from './player/player.component';
import { HomeComponent } from './home/home.component';
import { MinuteSecondPipe } from './minute-second.pipe';
import { SongNamePipe } from './song-name.pipe';
import { BookComponent } from './book/book.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { PageNumberPipe } from './page-number.pipe';
import { SearchPipe } from './search.pipe';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { SortPipe } from './sort.pipe';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment.development';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HomeComponent,
    MinuteSecondPipe,
    SongNamePipe,
    BookComponent,
    PageNumberPipe,
    SearchPipe,
    LoadingScreenComponent,
    LoginComponent,
    RegisterComponent,
    RestrictedPageComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(
      {
        // apiKey: JSON.parse(process.env["FIREBASE_CONFIG"] as string).apiKey,
        // authDomain: JSON.parse(process.env["FIREBASE_CONFIG"] as string).authDomain,
        // databaseURL: JSON.parse(process.env["FIREBASE_CONFIG"] as string).databaseURL,
        // projectId: JSON.parse(process.env["FIREBASE_CONFIG"] as string).projectId,
        // storageBucket: JSON.parse(process.env["FIREBASE_CONFIG"] as string).storageBucket,
        // messagingSenderId: JSON.parse(process.env["FIREBASE_CONFIG"] as string).messagingSenderId,
        // appId: JSON.parse(process.env["FIREBASE_CONFIG"] as string).appId
        apiKey: process.env["APIKEY"],
        authDomain: process.env["AUTHDOMAIN"],
        databaseURL: process.env["DATABASEURL"],
        projectId: process.env["PROJECTID"],
        storageBucket: process.env["STORAGEBUCKET"],
        messagingSenderId: process.env["MESSAGINGSENDERID"],
        appId: process.env["APPID"]
      }
    )
  ],
  providers: [provideHttpClient(withFetch()), provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
