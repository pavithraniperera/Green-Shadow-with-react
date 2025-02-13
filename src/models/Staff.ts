

export  class Staff{
    staffId?: string;
    firstName:string;
    lastName:string;
    gender:string;
    joinDate:string | Date;
    email:string;
    contact:string;
    address:string;
    designation:string;
    role:string;
    dob:string |Date;
    fieldIds:string[]

    constructor(firstName:string, lastName:string, gender:string,joinDate:Date,email:string,contactNumber:string,address:string,designation:string,role:string,  dob:string |Date,assignedField:string[],staffId?:string){
        this.staffId = staffId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.joinDate = new Date(joinDate);
        this.email = email;
        this.contact = contactNumber;
        this.address = address;
        this.designation = designation;
        this.role = role;
        this.dob = dob;
        this.fieldIds = assignedField;

    }
}
