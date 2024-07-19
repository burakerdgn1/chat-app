
import { Response, Request } from "express";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";

export class UserController {
  private userService: UserService;
  private authService: AuthService;
  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }


  async getMe(req: Request, res: Response) {
    try {
      const userId = req.body.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.profilePicture = user.profilePicture ? `http://localhost:3000/${user.profilePicture}` : '';

      res.json({ data: { user } });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const userId = req.body.id;
      const users = await this.userService.getAllUsers(userId);
      users?.forEach(user => {
        user.profilePicture = user.profilePicture ? `http://localhost:3000/${user.profilePicture}` : '';
      });
      res.json({ data: { users } });
    }
    catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  async uploadProfilePicture(req: Request, res: Response) {
    try {
      const userId = req.body.id;
      console.log("user id is :", userId);
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const filePath = req.file.path;
      await this.userService.updateUserProfilePicture(userId, filePath);
      res.json({ message: 'Profile picture updated successfully', filePath });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // async getUser(req: Request, res: Response) {
  //   try {
  //     const userId = req.params.id;
  //     const user = await userService.getUserById(userId);
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  //     res.json(user);
  //   }
  //   catch (e) {
  //     res.status(500).json({ message: `Internal Server Error: ${e}` });
  //   }

  // }

}
