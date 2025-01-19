import {Role} from "./User.ts";

export  class Staff{
    firstName:string;
    lastName:string;
    gender:string;
    joinDate:string | Date;
    email:string;
    contactNumber:string;
    address:string;
    designation:string;
    role:Role;
    assignedField:string

    constructor(firstName:string, lastName:string, gender:string,joinDate:Date,email:string,contactNumber:string,address:string,designation:string,role:Role,assignedField:string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.joinDate = new Date(joinDate);
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.designation = designation;
        this.role = role;
        this.assignedField = assignedField;

    }
}
