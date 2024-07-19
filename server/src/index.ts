import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserRoute } from "./modules/user/user.route";
import { AuthRoute } from "./shared/auth/auth.route";
import { Database } from "./database/database";
import { DatabaseMigration } from "./database/database.migration";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { UserController } from "./modules/user/user.controller";
import { UserService } from "./modules/user/user.service";
import { AuthService } from "./shared/auth/auth.service";
import { AuthController } from "./shared/auth/auth.controller";
import { MessageRoute } from "./modules/message/message.route";
import { MessageController } from "./modules/message/message.controller";
import { MessageService } from "./modules/message/message.service";
import { MessageRepository } from "./modules/message/message.repository";
import { UserRepository } from "./modules/user";
import { MessageCreateDto } from "./modules/message/dtos/message.create.dto";
import path from "path";

dotenv.config();

class App {
  public app: express.Application;
  public port: number | string;
  public db: DatabaseMigration;
  public httpServer: http.Server;
  public io: SocketIOServer;
  private userService = new UserService(new UserRepository());

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this.port = process.env.PORT || 3000;
    const database = new Database();
    this.db = new DatabaseMigration(database);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSocket();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" })
    );
    this.app.options(
      "*",
      cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" })
    );
    this.app.use(express.json());
    const uploadsPath = path.join(__dirname, "uploads");
    this.app.use("/uploads", express.static(uploadsPath));
  }

  private initializeRoutes() {
    const messageRepository = new MessageRepository();
    const userRepository = new UserRepository();

    const userService = new UserService(userRepository);
    const authService = new AuthService(userRepository, userService);
    const messageService = new MessageService(messageRepository);

    const authController = new AuthController(authService);
    const userController = new UserController(userService, authService);
    const messageController = new MessageController(messageService);

    const authRoute = new AuthRoute(authController);
    const userRoute = new UserRoute(userController);
    const messageRoute = new MessageRoute(messageController);

    this.app.use("/api/auth", authRoute.router);
    this.app.use("/api/users", userRoute.router);
    this.app.use("/api/messages", messageRoute.router);
  }

  private initializeSocket() {
    this.io.on("connection", (socket) => {
      console.log("New connection:", socket.id);

      socket.on("sendMessage", (newMessage: MessageCreateDto) => {
        try {
          this.io.emit("receiveMessage", newMessage);
        } catch (err) {
          console.error("Error handling receiveMessage event: ", err);
        }
      });

      socket.on("userConnected", async (userId: string) => {
        console.log("User connected:", userId);
        await this.userService.updateUserOnlineStatus(userId, true);
        socket.data.userId = userId; // Store userId in socket data
        this.broadcastUserList();
      });

      socket.on("userDisconnected", async (userId: string) => {
        console.log("User disconnected:", userId);
        await this.userService.updateUserOnlineStatus(userId, false);
        this.broadcastUserList();
      });

      socket.on("disconnect", async () => {
        const userId = socket.data.userId; // Retrieve the userId from the socket object
        if (userId) {
          console.log("User disconnected due to socket disconnect:", userId);
          await this.userService.updateUserOnlineStatus(userId, false);
        }
        this.broadcastUserList();
      });
    });
  }
  private async broadcastUserList() {
    try {
      const onlineUsers = await this.userService.getAllOnlineUsers();
      this.io.emit(
        "userListUpdate",
        onlineUsers.map((user) => user.id)
      );
    } catch (err) {
      console.error("Error broadcasting user list:", err);
    }
  }

  public async listen() {
    try {
      await this.db.initDB();
      this.httpServer.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    } catch (err) {
      console.error("Failed to initialize the database:", err);
      process.exit(1);
    }
  }
}

const appInstance = new App();
appInstance.listen();
