import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from 'src/app/model/classroom';
import { User } from 'src/app/model/user';
import { ClassroomService } from 'src/app/services/classroom.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  title : string = 'Registration Form';
  submitted : boolean = false;
  registrationForm! : FormGroup ;
  loading:boolean = false;
  error : string = '';
  returnurl : string = '';
  _classRooms! : Classroom[];
  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute, private router : Router,private userService :UserService,private classroomService :ClassroomService) {
      this.classroomService.getAllClassrooms().subscribe(classes =>{
        this._classRooms = classes;
      });
   }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      "name" : ['',[Validators.required]],
      "email": ['',[Validators.required,Validators.email]],
      "password" : ['',[Validators.required,Validators.minLength(8)]],
      "department" : ['Administration',[Validators.required]],
      "profession" :['',[Validators.required]],
      "DOB" :['',[Validators.required]],
      "DOJ" : ['',[Validators.required]],
      "phno" : ['',[Validators.required]],
      "Address" :['',[Validators.required]],
    });

    this.returnurl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.registrationForm.controls;
  }

  onRegister(){
    this.submitted = true;

    if(!this.registrationForm.valid){
      alert("Please enter password of length minimum 8 character");
      return;
    }

    this.userService.registernewuser(new User(this.f.name.value,this.f.email.value,this.f.profession.value,this.f.department.value,this.f.DOB.value,this.f.DOJ.value,this.f.phno.value, false, "",this.f.password.value,this.f.Address.value)).subscribe(result => {
      alert("Please use Registration ID for login:"+ (result as User).registrationID);
      this.tologin();
    },error=>{
      alert(error.message);
    });

    this.loading = true;
  }

  tologin(){
    this.router.navigate(['/login']);
  }

}
