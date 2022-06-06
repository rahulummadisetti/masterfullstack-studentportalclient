import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment}  from 'src/environments/environment';
import { User } from '../model/user';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject! : BehaviorSubject<User>;
  private currentUser! : Observable<User>;

  constructor( private userService : UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || JSON.stringify(new User("","","","",new Date('1900-01-01'),new Date('1900-01-01'),"",false,"",""))));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }

   login(email : string, password : string){
    return this.userService.authenticationuser(email,password).pipe(map(user => {
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User("","","","",new Date('1900-01-01'),new Date('1900-01-01'),"",false,"",""));
  }
}
