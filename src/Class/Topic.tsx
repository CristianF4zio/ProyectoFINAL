
export  default class Topic {
    name: string;
    description: string;
    id: string;
    constructor(name: string, description: string, id: string) {
        this.name = name;
        this.description = description;
        this.id = id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
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
    setId(id: string) {
        this.id = id;
    }
    
}