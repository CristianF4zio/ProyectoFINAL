

export  default class User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    icon:   string;
    member: boolean;
    descrption: string;
    constructor(name: string,lastname: string,email: string, password: string, icon: string, member: boolean) {
        this.name = name;
        this.lastName = lastname;
        this.email = email;
        this.password = password;
        this.icon = icon;
        this.member = member;
        this.descrption = " ";
    }
    getDescription() {
        return this.descrption;
    }
    setDescription(description: string) {
        this.descrption = description;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(lastname: string) {
        this.lastName = lastname;
    }
    getMember() {
        return this.member;
    }
    setMember(member: boolean) {
        this.member = member;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getIcon() {
        return this.icon;
    }
    setName(name: string) {
        this.name = name;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setPassword(password: string) {
        this.password = password;
    }
    setIcon(icon: string) {
        this.icon = icon;
    }
    toString() {
        return `name: ${this.name}, email: ${this.email}, password: ${this.password}, icon: ${this.icon}`;
    }
}