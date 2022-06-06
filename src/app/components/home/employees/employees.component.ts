import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogemployeeeditComponent } from './dialogemployeeedit/dialogemployeeedit.component';
import { DialogemployeeresetpasswordComponent } from './dialogemployeeresetpassword/dialogemployeeresetpassword.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  _users! : User[];
  dtoptions : DataTables.Settings = {};

  constructor(private formBuilder : FormBuilder, 
    private route : ActivatedRoute, 
    private router : Router,
    private userService :UserService,
    private authenticationService : AuthenticationService,
    private datepipe : DatePipe ,
    private dialog:MatDialog) {

      this.userService.getAllUser().subscribe(users => {
        this._users = users;
      })

     }

  ngOnInit(): void {
  
    this.dtoptions = {
      pagingType : "full_numbers",
      pageLength : 5,
      processing : true
    }
  
  }

  OnEdit(user: User){
    const dialogRef = this.dialog.open(DialogemployeeeditComponent, { data : user});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userService.updateUser(result).subscribe(result1 => {
          this.userService.getAllUser().subscribe(users => {
              this._users = users;
          })
         },error =>{
           alert(JSON.stringify(error));
         })
      }
    })

  }

  OnDelete(user : User){
    this.userService.deleteUser(user).subscribe(data => {
      this.userService.getAllUser().subscribe(users => {
        this._users = users;
    },error1 =>{
      alert(JSON.stringify(error1));
    })
   },error =>{
     alert(JSON.stringify(error));
   })
  }

  OnResetPassword(user : User){
    const dialogRef = this.dialog.open(DialogemployeeresetpasswordComponent, { data : user});
    dialogRef.afterClosed().subscribe(result => {
        this.userService.updateUserPassword(result.registrationID,result.password).subscribe(result1 => {
          alert("Password Reset successful");
        },error1 =>{
          alert(JSON.stringify(error1));
        })
    },error =>{
      alert(JSON.stringify(error));
    })
  }


}
