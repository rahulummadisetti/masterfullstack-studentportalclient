import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialogemployeeresetpassword',
  templateUrl: './dialogemployeeresetpassword.component.html',
  styleUrls: ['./dialogemployeeresetpassword.component.css']
})
export class DialogemployeeresetpasswordComponent implements OnInit {

  title : string = "Reset Password"
  resetPasswordForm ! : FormGroup;
  
  constructor(private formBuilder : FormBuilder,private userService :UserService,private datepipe : DatePipe,
    public dialogRef: MatDialogRef<DialogemployeeresetpasswordComponent>, @Inject(MAT_DIALOG_DATA) public user : User) { }

  ngOnInit(): void {

    this.resetPasswordForm = this.formBuilder.group({
      "registrationID" :[{value:this.user.registrationID,disabled:true},[Validators.required]],
      "password": ["",[Validators.required,Validators.minLength(8)]],
      "confirmpassword" : ["",[Validators.required,Validators.minLength(8)]],
    })
  }

get f(){
  return this.resetPasswordForm.controls;
}

onReset(){
  
  if(!this.resetPasswordForm.valid){
    alert("Please enter password of length minimum 8 character");
    return;
  }
  this.dialogRef.close({"registrationID" : this.user.registrationID, "password" : this.f.password.value});
}

onClose(){
  this.dialogRef.close();
}
}
