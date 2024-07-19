import { User } from "../../../modules/user";

export interface RegisterResponse {
    message: string;
    success: boolean;
    user?: User;
}