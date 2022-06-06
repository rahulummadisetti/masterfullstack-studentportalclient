import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private httpclient: HttpClient) { }

  registernewuser(user: User) {
    return this.httpclient.post<User>(`${environment.apiUrl}user`,user);
  }

  authenticationuser(registrationID: string,password: string){
    return this.httpclient.post<any>(`${environment.apiUrl}login`,{"registrationID":registrationID, "password":password});
  }

  getUserByRegistrationID(registrationID: string) {
    return this.httpclient.get<User>(`${environment.apiUrl}user?registrationID=${registrationID}`);
  }

  getAllUser(){
    return this.httpclient.get<User[]>(`${environment.apiUrl}user`);
  }

  updateUser(user: User){
    return this.httpclient.put<User>(`${environment.apiUrl}user`,user);
  }

  deleteUser(user: User){
    return this.httpclient.delete<User>(`${environment.apiUrl}user/${user.registrationID}`);
  }

  updateUserPassword(registrationID: string,password: string){
    return this.httpclient.put<User>(`${environment.apiUrl}updatePassword`,{registrationID : registrationID, password : password});
  }
}
