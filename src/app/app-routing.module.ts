import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/home/employees/employees.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { LeaverequestComponent} from './components/home/leaverequest/leaverequest.component';
import {NotificationsComponent} from './components/home/notifications/notifications.component';
import {ForgotpasswordComponent} from './components/home/forgotpassword/forgotpassword.component';

import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import { AuthGuard } from './helpers/Guards/auth.guard';
import { AdminGuard } from './helpers/Guards/admin.guard';


const routes: Routes = [
  { path:'',redirectTo:'/profile',pathMatch:'full'},
  { path:'login',component:LoginComponent},
  { path:'registration',component:RegistrationComponent},
  { path :'forgotpassword', component:ForgotpasswordComponent },
  { path: 'profile' , component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'employees',component:EmployeesComponent , canActivate:[AuthGuard,AdminGuard]},
  { path: 'leaverequest',component:LeaverequestComponent, canActivate:[AuthGuard]},
  { path: 'notifications',component:NotificationsComponent, canActivate:[AuthGuard]},
  { path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
