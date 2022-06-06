export class Notifications {
    public _id: String ="";
    constructor(public registrationID : string , 
        public departmentID : String, 
        public notification : String,
        public fromDate : Date,
        public toDate : Date){}
}
