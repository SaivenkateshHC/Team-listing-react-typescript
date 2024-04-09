export interface IUsers {
    first_name: string;
    last_name: string;
    email: string;
    img: string;
    role: Role;
}

enum Role {
    admin = 'admin',
    user = 'user'
}