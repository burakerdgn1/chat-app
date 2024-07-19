import { Database } from "./database";
import bcrypt from "bcrypt";

export class DatabaseMigration {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async initDB() {
    await this.createUsersTable();
    await this.createDefaultAdmin();
  }

  async createDefaultAdmin() {
    const adminEmail = "admin@example.com"; // Change this to your desired admin email
    const adminExistsQuery = `SELECT * FROM users WHERE email = $1 AND role = 'admin'`;
    const createUserQuery = `
            INSERT INTO users (fullname, username, email, password, role)
            VALUES ($1, $2, $3, $4, 'admin')
        `;

    try {
      const adminExists = await this.db.query(adminExistsQuery, [adminEmail]);

      if (adminExists.length === 0) {
        const hashedPassword = await bcrypt.hash("Admin123*", 10); // Change this to your desired admin password
        await this.db.query(createUserQuery, [
          "Admin123",
          "admin123",
          adminEmail,
          hashedPassword,
        ]);
        console.log("Default admin user created");
      } else {
        console.log("Admin user already exists");
      }
    } catch (err) {
      console.error("Error creating default admin user", err);
    }
  }

  async createUsersTable() {
    const createUUidExtensionQuery = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `;
    const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                fullname VARCHAR(128) NOT NULL,
                username VARCHAR(128) NOT NULL,
                email VARCHAR(128) NOT NULL UNIQUE,
                password VARCHAR(128) NOT NULL,
                isonline BOOLEAN DEFAULT FALSE,
                role VARCHAR(50) DEFAULT 'user',
                profilepicture VARCHAR(100) DEFAULT ''
            );
        `;
    const createMessagesTableQuery = `
            CREATE TABLE IF NOT EXISTS messages (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
                receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
    try {
      await this.db.query(createUUidExtensionQuery);
      await this.db.query(createUsersTableQuery);
      await this.db.query(createMessagesTableQuery);

      console.log("Users table created successfully");
      console.log("Messages table created successfully");
    } catch (err) {
      console.error("Error creating users table", err);
    }
  }
}
