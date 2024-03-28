import React from 'react';
import User from './User';

interface GroupProps {
    group: Group;
}

class Group {
    name: string;
    description: string;
    members: User[];
    id: string;
    icon: string;
    constructor(name: string, description: string, members: User[], id: string, icon: string) {
        this.name = name;
        this.description = description;
        this.members = members;
        this.id = id;      
        this.icon = icon;
    }
    getIcon() {
        return this.icon;
    }
    setIcon(icon: string) {
        this.icon = icon;
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

const GroupCard: React.FC<GroupProps> = ({ group }) => {
    return (
        <div className="card">
            <img src={group.getIcon()} alt={group.getName()} className="group-icon" />
            <div className="group-name">{group.getName()}</div>
            <div className="group-description">{group.getDescription()}</div>
        </div>
    );
};

const App: React.FC = () => {
    const groups: Group[] = [
        new Group('Grupo 1', 'Descripción del Grupo 1', [], '1', 'ruta/a/imagen_grupo_1.png'),
        new Group('Grupo 2', 'Descripción del Grupo 2', [], '2', 'ruta/a/imagen_grupo_2.png'),
        // Agregar más grupos si es necesario
    ];

    return (
        <div id="root">
            {groups.map((group) => (
                <GroupCard key={group.getId()} group={group} />
            ))}
        </div>
    );
};

export default App;
