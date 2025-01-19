export enum Role {
    MANAGER = "MANAGER",
    ADMINISTRATOR = "ADMINISTRATOR",
    SCIENTIST = "SCIENTIST",
    OTHER = "OTHER",

}

export  class User {
    email: string;
    password: string;
    role: Role;

    constructor(email: string, password: string, role: Role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }


}
