import User from "./User";

export  default class Group {
    name: string;
    description: string;
    members: User[];
    id: string;
    constructor(name: string, description: string, members: User[], id: string) {
        this.name = name;
        this.description = description;
        this.members = members;
        this.id = id;      
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getMembers() {
        return this.members;
    }
    getId() {
        return this.id;
    }
    setName(name: string) {
        this.name = name;
    }
    setDescription(description: string) {
        this.description = description;
    }
    setMembers(members: User[]) {
        this.members = members;
    }
    setId(id: string) {
        this.id = id;
    }
    addMember(member: User) {
        this.members.push(member);
    }
    removeMember(member: User) {
        this.members = this.members.filter((m) => m !== member);
    }
    getMember(email: string) {
        return this.members.find((m) => m.getEmail() === email);
    }
    getMembersCount() {
        return this.members.length;
    }
    isMember(user: User) {
        return this.members.includes(user);
    }
    getMembersEmails() {
        return this.members.map((m) => m.getEmail());
    }
    getMembersNames() {
        return this.members.map((m) => m.getName());
    }
    getMembersIcons() {
        return this.members.map((m) => m.getIcon());
    }
    getMembersLastNames() {
        return this.members.map((m) => m.getLastName());
    }
    getMembersDescriptions() {
        return this.members.map((m) => m.getDescription());
    }
    getMembersMembers() {
        return this.members.map((m) => m.getMember());
    }
    getMembersPasswords() {
        return this.members.map((m) => m.getPassword());
    }
   

}