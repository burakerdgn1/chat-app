import { UserCreateDto } from "./dtos/user.create.dto";
import { User } from "./user.model";
import { Database } from "../../database/database";
import { UserUpdateDto } from "./dtos/user.update.dto";

interface DBUser {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    password: string;
    isOnline: boolean;
    role: string;
    profilePicture: string;

}

export class UserRepository {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public async getUsers(userId: string): Promise<User[]> {
        try {
            const rows = await this.db.query(`SELECT * FROM users WHERE id != $1 AND role !=$2 `, [userId, 'admin']);
            const users = rows.map((row: any) => new User(row.id, row.username, row.fullname, row.email, row.isonline, row.role, row.profilepicture))
            return users;
        } catch (err) {
            throw new Error(`Error fetching users from the database:${err}`);
        }
    }

    public async getUserById(id: string): Promise<User> {
        try {
            const rows = await this.db.query(`SELECT * FROM users WHERE id = $1`, [
                id,
            ]);
            const row = rows[0];

            return new User(
                row.id,
                row.fullname,
                row.username,
                row.email,
                row.isonline,
                row.role,
                row.profilepicture
            );
        } catch (err) {
            throw new Error(`Error fetching user from the database:${err}`);
        }
    }

    public async getUserByEmail(email: string): Promise<DBUser | null> {
        try {
            const rows = await this.db.query(`SELECT * FROM users WHERE email = $1`, [
                email,
            ]);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            const user: DBUser = { id: row.id, fullName: row.fullname, email: row.email, userName: row.username, password: row.password, isOnline: row.isonline, role: row.role, profilePicture: row.profilepicture }

            return user;
        } catch (err) {
            console.log("error", err);
            throw new Error(`Error fetching user from the database:${err}`);
        }
    }

    public async createUser(user: UserCreateDto): Promise<User> {
        try {
            const { fullName, userName, email, password } = user;
            const rows = await this.db.query(
                `
                INSERT INTO users (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *
            `,
                [fullName, userName, email, password]
            );
            const row = rows[0];
            return new User(
                row.id,
                row.fullName,
                row.userName,
                row.email,
                row.isonline,
                row.role,
                row.profilepicture

            );
        } catch (err) {
            throw new Error(`Error creating user in the database:${err}`);
        }
    }

    public async updateUser(user: UserUpdateDto): Promise<User> {
        try {
            const { id, fullName, userName, email } = user;
            const rows = await this.db.query(
                `
            UPDATE users SET fullname = $1, username = $2, email = $3, 
            WHERE id = $4
            RETURNING *
            `,
                [fullName, userName, email, id]
            );
            const row = rows[0];
            return new User(
                row.id,
                row.fullName,
                row.userName,
                row.email,
                row.isonline,
                row.role,
                row.profilepicture

            );
        } catch (err) {
            throw new Error(`Error updating user in the database:${err}`);
        }
    }
    public async updateUserOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
        try {
            await this.db.query(`
                UPDATE users
                SET isonline = $1
                WHERE id = $2
            `, [isOnline, userId]);
        } catch (err) {
            throw new Error(`Error updating user online status: ${err}`);
        }
    }

    public async getOnlineUsers(): Promise<User[]> {
        try {
            const rows = await this.db.query(`SELECT * FROM users WHERE isonline = true`);
            return rows.map((row: any) => new User(row.id, row.username, row.fullname, row.email, row.isonline, row.role, row.profilepicture));
        } catch (err) {
            throw new Error(`Error fetching online users from the database: ${err}`);
        }
    }

    public async updateUserProfilePicture(userId: string, filePath: string): Promise<void> {
        try {
            await this.db.query('UPDATE users SET profilepicture = $1 WHERE id = $2', [filePath, userId]);
        } catch (err) {
            throw new Error(`Error updating user profile picture: ${err}`);
        }
    }


}
