import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Classroom } from '../model/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpclient: HttpClient) { }


  getAllClassrooms() {
    return this.httpclient.get<Classroom[]>(`${environment.apiUrl}classroom`);
  }


}
