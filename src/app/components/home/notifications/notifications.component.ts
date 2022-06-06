import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notifications } from 'src/app/model/notifications';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  _notifications!:Notifications[];
  dtoptions : DataTables.Settings = {};
  _notificationForm!:FormGroup;

  constructor(private formBuilder : FormBuilder, 
    private route : ActivatedRoute, 
    private router : Router,
    private notificationsService :NotificationsService,
    private authenticationService : AuthenticationService) { 
      if(authenticationService.currentUserValue.profession === "admin"){
        this.notificationsService.getAllNotifications().subscribe(notifications =>{
          this._notifications = notifications;
        }); 
      } else {
        this.notificationsService.getAllNotificationByID(this.authenticationService.currentUserValue).subscribe(notifications =>{
          this._notifications = notifications;
        });
      }
    }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType : "full_numbers",
      pageLength : 5,
      processing : true
    }

    this._notificationForm = this.formBuilder.group({
      "registrationID" :["",[Validators.required]],
      "departmentID" :["",[Validators.required]],
      "fromDate" : ["",[Validators.required]],
      "toDate" : ["",[Validators.required]],
      "notification" : ["",[Validators.required]]
    });
  }

  get f(){
    return this._notificationForm.controls;
  }
  
  isAdmin(){
    return this.authenticationService.currentUserValue.profession === "admin";
  }

  OnSubmit(){
    this.notificationsService.addNotification(new Notifications(this.f.registrationID.value,this.f.departmentID.value,this.f.notification.value,this.f.fromDate.value,this.f.toDate.value)).subscribe(data => {
      if(this.authenticationService.currentUserValue.profession === "admin"){
        this.notificationsService.getAllNotifications().subscribe(notifications =>{
          this._notifications = notifications;
        }); 
      } else {
        this.notificationsService.getAllNotificationByID(this.authenticationService.currentUserValue).subscribe(notifications =>{
          this._notifications = notifications;
        });
      }
    })
  }


}
