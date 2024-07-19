import { User } from "../../../modules/user";

export interface LoginResponse {
    message: string;
    success: boolean;
    user?: User;
    token?: string;
}