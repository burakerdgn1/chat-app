import { User } from "../../../modules/user";

export interface UsersResponse {
    message: string;
    success: boolean;
    users?: User[];
}