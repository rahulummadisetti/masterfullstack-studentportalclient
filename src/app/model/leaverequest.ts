export class Leaverequest {
    public _id: String ="";
    constructor(public registrationID : String, 
        public fromDate : Date,
        public toDate : Date,
        public purpose : String,
        public status : String){}
}

