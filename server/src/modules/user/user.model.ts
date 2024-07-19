
export class User {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    isOnline: boolean;
    role: string;
    profilePicture: string;


    constructor(
        id: string,
        fullName: string,
        userName: string,
        email: string,
        isOnline: boolean,
        role: string = 'user', profilePicture: string) {
        this.id = id;
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.isOnline = isOnline;
        this.role = role;
        this.profilePicture = profilePicture
    }
}
