import { Router } from "express";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../modules/user";
import { validationMiddleware } from "../../shared/middlewares/validationMiddleware";

export class AuthRoute {
  public authController: AuthController;
  public router: Router;
  constructor(authController: AuthController) {
    this.authController = authController;
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post("/logout", authMiddleware, (req, res) =>
      this.authController.logout(req, res)
    );
    this.router.post("/login", validationMiddleware(LoginDto), (req, res) =>
      this.authController.login(req, res)
    );
    this.router.post(
      "/register",
      validationMiddleware(RegisterDto),
      (req, res) => this.authController.register(req, res)
    );
  }
}
