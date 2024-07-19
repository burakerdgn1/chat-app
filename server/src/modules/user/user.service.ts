import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import { UserUpdateDto } from "./dtos/user.update.dto";
import path from "path";

export class UserService {
  public userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(userId: string): Promise<User[] | null> {
    try {
      const users: User[] = await this.userRepository.getUsers(userId);
      if (!users) {
        throw new Error("Users are empty");
      }
      return users;
    } catch (err) {
      throw new Error(`Error in UserService.getAllUsers: ${err}`);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user: User = await this.userRepository.getUserById(id);
      console.log("user:", user);
      if (!user) {
        throw new Error("User does not exist!");
      }

      return user;
    } catch (err) {
      throw new Error(`Error in UserService.getUserById: ${err}`);
    }
  }
  async updateUser(newUser: UserUpdateDto): Promise<User> {
    try {
      const updatedUser = await this.userRepository.updateUser(newUser);
      return updatedUser;
    } catch (err) {
      throw new Error(`Error in UserService.updateUser: ${err}`);
    }
  }

  async updateUserOnlineStatus(
    userId: string,
    isOnline: boolean
  ): Promise<void> {
    try {
      await this.userRepository.updateUserOnlineStatus(userId, isOnline);
    } catch (err) {
      throw new Error(
        `Error updating user online status in UserService: ${err}`
      );
    }
  }
  async getAllOnlineUsers(): Promise<User[]> {
    try {
      return await this.userRepository.getOnlineUsers();
    } catch (err) {
      throw new Error(`Error fetching online users: ${err}`);
    }
  }

  async updateUserProfilePicture(
    userId: string,
    filePath: string
  ): Promise<void> {
    const relativeFilePath = `uploads/${path.basename(filePath)}`;
    try {
      await this.userRepository.updateUserProfilePicture(
        userId,
        relativeFilePath
      );
    } catch (err) {
      throw new Error(`Error in UserService.updateUserProfilePicture: ${err}`);
    }
  }
}
