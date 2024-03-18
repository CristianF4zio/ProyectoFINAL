

export  default class User {
    name: string;
    email: string;
    password: string;
    icon:   string;
    member: boolean;
    constructor(name: string, email: string, password: string, icon: string, member: boolean) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.icon = icon;
        this.member = member;
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