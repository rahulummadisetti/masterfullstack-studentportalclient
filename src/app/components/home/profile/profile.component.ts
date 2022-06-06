import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

import {DatePipe} from '@angular/common';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title: string="Profile"
  profileForm! : FormGroup ;
  returnurl : string = '';
  _user : User = new User("","","","",new Date('1900-01-01'),new Date('1900-01-01'),"",false,"","");

  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute, private router : Router,private userService :UserService,private authenticationService : AuthenticationService,private datepipe : DatePipe) {

   this.userService.getUserByRegistrationID(this.authenticationService.currentUserValue.registrationID).subscribe(objuser => {
     Object.assign(this._user,objuser); 
     this.profileForm.controls['name'].setValue(this._user.name);
     this.profileForm.controls['email'].setValue(this._user.email);
     this.profileForm.controls['password'].setValue(this._user.password);
     this.profileForm.controls['department'].setValue(this._user.department);
     this.profileForm.controls['profession'].setValue(this._user.profession);
     this.profileForm.controls['DOB'].setValue(this.datepipe.transform(this._user.DOB,"yyyy-MM-dd"));
     this.profileForm.controls['DOJ'].setValue(this.datepipe.transform(this._user.DOJ,"yyyy-MM-dd"));
     this.profileForm.controls['phno'].setValue(this._user.phno);
     this.profileForm.controls['Address'].setValue(this._user.Address);
     this.profileForm.controls['registrationID'].setValue(this._user.registrationID);

    });
   }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      "name" : [this._user.name,[Validators.required]],
      "email": [this._user.email,[Validators.required,Validators.email]],
      "password" : [this._user.password,[Validators.required]],
      "department" : [this._user.department,[Validators.required]],
      "profession" :[this._user.profession,[Validators.required]],
      "DOB" :[this.datepipe.transform(this._user.DOB,"yyyy-MM-dd"),[Validators.required]],
      "DOJ" : [this.datepipe.transform(this._user.DOJ,"yyyy-MM-dd"),[Validators.required]],
      "phno" : [this._user.phno,[Validators.required]],
      "Address" :[this._user.Address,[Validators.required]],
      "registrationID" :[{value:this._user.registrationID,disabled:true},[Validators.required]],
    });

    this.returnurl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.profileForm.controls;
  }

  onUpdate(){
    
  }
}
