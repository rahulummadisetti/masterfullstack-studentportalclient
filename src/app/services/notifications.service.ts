import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notifications } from '../model/notifications';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpclient: HttpClient) { }

  getAllNotifications() {
    return this.httpclient.get<Notifications[]>(`${environment.apiUrl}notification`);
  }

  getAllNotificationByID(user: User){
    return this.httpclient.get<Notifications[]>(`${environment.apiUrl}notification?registrationID=${user.registrationID}&departmentID=${user.department}`);
  }

  addNotification(notification: Notifications){
    return this.httpclient.post<Notifications>(`${environment.apiUrl}notification`,notification);
  }
}
