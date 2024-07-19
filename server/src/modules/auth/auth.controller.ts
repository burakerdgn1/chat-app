import { Response, Request } from "express";
import { RegisterDto } from "./dtos/register.dto";
import { AuthService } from "./auth.service";


export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        console.log('AuthController initialized with authService:', this.authService);
    }

    async register(req: Request, res: Response) {
        if (this.authService) {
            const result = await this.authService.registerUser(req.body as RegisterDto);
            if (result.success) {
                res.status(201).json(result);
            } else {
                res.status(400).json(result);
            }
        }
    }
    async login(req: Request, res: Response) {
        if (this.authService) {
            const result = await this.authService.loginUser(req.body as RegisterDto);
            if (result.success) {
                res.status(201).json(result);
            } else {
                res.status(400).json(result);
            }
        }

    }
    async logout(req: Request, res: Response) {
        try {
            const userId = req.body.id;
            this.authService.logoutUser(userId);
            res.status(200).json({ message: 'Successfully logged out' });
        }
        catch (err) {
            res.status(500).json({ message: err })
        }
    }
}

