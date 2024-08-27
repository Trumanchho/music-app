import { Injectable } from '@angular/core';
import { User } from './User';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:User[] = []
  loggedIn = false;
  currentUser:User = new User('','',false)
  constructor(private af:AngularFirestore) { }
  getUsers() {
    this.users = []
    this.af.collection('Users').valueChanges().subscribe((data)=> {
      for (let user of data) {
        let newUser:User = <User>user
        this.users.push(new User(newUser.email, newUser.password, newUser.verified))
      }
    })
  }
  addUser(newUser:User) {
    this.users.push(newUser)
    this.af.collection("Users").doc(newUser.email).set({email: newUser.email, password: newUser.password, verified: newUser.verified})
  }
  findUser(email:string):User | undefined {
    return this.users.find((user)=> {
      return user.email === email
    })
  }
}
