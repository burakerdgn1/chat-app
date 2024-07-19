import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from './middleware/authMiddleware';
import upload from '../../shared/middlewares/fileUpload.middleware';

export class UserRoute {
    public userController: UserController;
    public router = Router();
    constructor(userController: UserController) {
        this.userController = userController;
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get('/me', authMiddleware, (req, res) => this.userController.getMe(req, res));
        this.router.get('/users', authMiddleware, (req, res) => this.userController.getUsers(req, res))
        this.router.post('/upload-pp', upload.single('profilePicture'), authMiddleware, this.userController.uploadProfilePicture.bind(this.userController));
        // this.router.get('/', userController.getAllUsers);
        // this.router.get('/:id', this.userController.getUser);
        // this.router.post('/', validationMiddleware(UserCreateDto), this.userController.createUser);
    }
}

