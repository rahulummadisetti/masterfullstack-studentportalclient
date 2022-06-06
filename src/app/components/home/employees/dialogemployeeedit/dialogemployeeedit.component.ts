import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from 'src/app/model/classroom';
import { User } from 'src/app/model/user';
import { ClassroomService } from 'src/app/services/classroom.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialogemployeeedit',
  templateUrl: './dialogemployeeedit.component.html',
  styleUrls: ['./dialogemployeeedit.component.css']
})
export class DialogemployeeeditComponent {

  title : string = "Edit "
   editForm! : FormGroup;
   _classRooms! : Classroom[];
   constructor(private formBuilder : FormBuilder,private userService :UserService,private datepipe : DatePipe,private classroomService :ClassroomService,
               public dialogRef: MatDialogRef<DialogemployeeeditComponent>, @Inject(MAT_DIALOG_DATA) public user : User) {

                this.classroomService.getAllClassrooms().subscribe(classes =>{
                  this._classRooms = classes;
                });
   }

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      "name" : [this.user.name,[Validators.required]],
      "email": [this.user.email,[Validators.required,Validators.email]],
      "department" : [this.user.department,[Validators.required]],
      "profession" :[this.user.profession,[Validators.required]],
      "DOB" :[this.datepipe.transform(this.user.DOB,"yyyy-MM-dd"),[Validators.required]],
      "DOJ" : [this.datepipe.transform(this.user.DOJ,"yyyy-MM-dd"),[Validators.required]],
      "phno" : [this.user.phno,[Validators.required]],
      "Address" :[this.user.Address,[Validators.required]],
      "registrationID" :[{value:this.user.registrationID,disabled:true},[Validators.required]],
    });
  }

  get f(){
    return this.editForm.controls;
  }

  onUpdate(){
    this.dialogRef.close(new User(this.f.name.value,this.f.email.value,this.f.profession.value,this.f.department.value,this.f.DOB.value,this.f.DOJ.value,this.f.phno.value, this.user.Active, this.f.registrationID.value,this.user.password,this.f.Address.value));
  }

  onClose(){
    this.dialogRef.close();
  }

}
