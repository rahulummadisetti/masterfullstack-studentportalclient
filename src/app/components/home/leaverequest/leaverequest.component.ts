import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Leaverequest } from 'src/app/model/leaverequest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LeaverequestService } from 'src/app/services/leaverequest.service';


@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.css']
})
export class LeaverequestComponent implements OnInit {

  _leaveRequest!: Leaverequest[];
  dtoptions : DataTables.Settings = {};
  _leaveRequestForm! : FormGroup;

  constructor(private formBuilder : FormBuilder, 
    private route : ActivatedRoute, 
    private router : Router,
    private leaverequestService :LeaverequestService,
    private authenticationService : AuthenticationService) { 
      
      if(authenticationService.currentUserValue.profession === "admin"){
        this.leaverequestService.getAllLeaveRequests().subscribe(leaverequests =>{
          this._leaveRequest = leaverequests;
        }); 
      } else {
        this.leaverequestService.getAllLeaveRequestsByRegistrationID(this.authenticationService.currentUserValue.registrationID).subscribe(leaverequests =>{
          this._leaveRequest = leaverequests;
        });
      }
    }

  ngOnInit(): void {

    this.dtoptions = {
      pagingType : "full_numbers",
      pageLength : 5,
      processing : true
    }

    this._leaveRequestForm = this.formBuilder.group({
      "registrationID" :[{value:this.authenticationService.currentUserValue.registrationID,disabled:true},[Validators.required]],
      "fromDate" : ["",[Validators.required]],
      "toDate" : ["",[Validators.required]],
      "purpose" : ["",[Validators.required]]
    });
  }

isAdmin(){
  return this.authenticationService.currentUserValue.profession === "admin";
}
get f(){
  return this._leaveRequestForm.controls;
}

OnSubmit(){
  this.leaverequestService.addleaverequest(new Leaverequest(this.f.registrationID.value, this.f.fromDate.value,this.f.toDate.value,this.f.purpose.value,"pending")).subscribe(data =>{
   
    if(this.authenticationService.currentUserValue.profession === "admin"){
      this.leaverequestService.getAllLeaveRequests().subscribe(leaverequests =>{
        this._leaveRequest = leaverequests;
      }); 
    } else {
      this.leaverequestService.getAllLeaveRequestsByRegistrationID(this.authenticationService.currentUserValue.registrationID).subscribe(leaverequests =>{
        this._leaveRequest = leaverequests;
      });
    }
  })

  this.f.fromDate.reset();
  this.f.toDate.reset();
  this.f.purpose.reset();
}

OnApprove(leaverequest: Leaverequest){
 leaverequest.status ="approved";
  this.leaverequestService.updateLeaveRequestByID(leaverequest).subscribe(data =>{
   
    if(this.authenticationService.currentUserValue.profession === "admin"){
      this.leaverequestService.getAllLeaveRequests().subscribe(leaverequests =>{
        this._leaveRequest = leaverequests;
      }); 
    } else {
      this.leaverequestService.getAllLeaveRequestsByRegistrationID(this.authenticationService.currentUserValue.registrationID).subscribe(leaverequests =>{
        this._leaveRequest = leaverequests;
      });
    }
  })

}

OnReject(leaverequest: Leaverequest){
  leaverequest.status ="rejected";
  this.leaverequestService.updateLeaveRequestByID(leaverequest).subscribe(data =>{
   
    if(this.authenticationService.currentUserValue.profession === "admin"){
      this.leaverequestService.getAllLeaveRequests().subscribe(leaverequests =>{
        this._leaveRequest = leaverequests;
      }); 
    } else {
      this.leaverequestService.getAllLeaveRequestsByRegistrationID(this.authenticationService.currentUserValue.registrationID).subscribe(leaverequests =>{
        this._leaveRequest = leaverequests;
      });
    }
  })
}

}
