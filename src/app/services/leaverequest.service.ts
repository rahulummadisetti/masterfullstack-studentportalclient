import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Leaverequest } from '../model/leaverequest';

@Injectable({
  providedIn: 'root'
})
export class LeaverequestService {

  constructor(private httpclient: HttpClient) { }

  getAllLeaveRequests(){
    return this.httpclient.get<Leaverequest[]>(`${environment.apiUrl}vacationrequest`);
  }

  getAllLeaveRequestsByRegistrationID(registrationID: string){
    return this.httpclient.get<Leaverequest[]>(`${environment.apiUrl}vacationrequest/${registrationID}`);
  }

  updateLeaveRequestByID(leaverequest: Leaverequest){
    return this.httpclient.put<Leaverequest>(`${environment.apiUrl}vacationrequest/${leaverequest._id}`,leaverequest);
  }

  addleaverequest(leaverequest: Leaverequest){
    return this.httpclient.post<Leaverequest>(`${environment.apiUrl}vacationrequest`,leaverequest);
  }

}
