import { User } from "../../../types/User";

export interface LoginResponse {
  sucess: string;
  message: string;
  token?: string | null;
  user?: User;
}
