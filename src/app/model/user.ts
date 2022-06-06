
/*
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25JRCI6IkFkbWluaXN0cmF0aW9uXzEiLCJpYXQiOjE2NTQyNTkxOTgsImV4cCI6MTY1NDg1OTE5OH0.IuRHiepxYzb3ZwWNsWk2eCRBFkxul20ba6rbpfJ0pi8",
  "name": "rahul",
  "email": "rahul.ummadisetti@gmail.com",
  "profession": "admin",
  "department": "Administration",
  "DOB": "1990-05-16T18:30:00.000Z",
  "DOJ": "2022-06-02T18:30:00.000Z",
  "phno": "8019655556",
  "Active": false,
  "registrationID": "Administration_1"
}
*/

export class User {
    public token : string ="";
    constructor(public name : string,
        public email : string,
        public profession : string,
        public department : string,
        public DOB : Date,
        public DOJ: Date,
        public phno : string,
        public Active : boolean, 
        public registrationID : string,
        public password : string,
        public Address : string = ""){}
}
