import { User } from "../../../types/User";

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
}
