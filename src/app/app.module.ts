import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataTablesModule} from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { NotificationsService } from './services/notifications.service';
import { LeaverequestService } from './services/leaverequest.service';
import {ClassroomService} from './services/classroom.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './components/home/profile/profile.component';
import { EmployeesComponent } from './components/home/employees/employees.component';
import { LeaverequestComponent } from './components/home/leaverequest/leaverequest.component';
import { NotificationsComponent } from './components/home/notifications/notifications.component';
import { ForgotpasswordComponent } from './components/home/forgotpassword/forgotpassword.component';
import { JwtInterceptor } from './helpers/Interceptors/jwt.interceptor';
import { ErrorInterceptor } from './helpers/Interceptors/error.interceptor';
import { DialogemployeeeditComponent } from './components/home/employees/dialogemployeeedit/dialogemployeeedit.component';
import { DialogemployeeresetpasswordComponent } from './components/home/employees/dialogemployeeresetpassword/dialogemployeeresetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    EmployeesComponent,
    LeaverequestComponent,
    NotificationsComponent,
    ForgotpasswordComponent,
    DialogemployeeeditComponent,
    DialogemployeeresetpasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    DataTablesModule,
    MatDialogModule,
    
  ],
  entryComponents: [DialogemployeeeditComponent,DialogemployeeresetpasswordComponent],
  providers: [ UserService,AuthenticationService,NotificationsService,LeaverequestService,ClassroomService,DatePipe,{
    provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi : true
  },{
    provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
