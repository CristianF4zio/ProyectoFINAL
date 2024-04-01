export default class Admin{
    email: string;
    password: string;
        constructor(email: string, password: string){
            this.email = email;
            this.password = password;
        }
        getEmail(){
            return this.email;
        }
        getPassword(){
            return this.password;
}

    setEmail(email: string){
        this.email = email;
    }
    setPassword(password: string){
        this.password = password;
    }
    toString(){
        return `email: ${this.email}, password: ${this.password}`;
    }
}