import { UserRepository, UserService } from "../../modules/user";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.utils";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import createClient, { Redis } from "ioredis";
import { RegisterResponse } from "./responseTypes/register.response";
import { LoginResponse } from "./responseTypes/login.response";

// const redisClient: Redis = new createClient();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 30 * 1; // 30 seconds
//Redis should be set up on the device

// redisClient.on("error", (err) => console.error("Redis Client Error", err));
export class AuthService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository, userService: UserService) {
    this.userRepository = userRepository;
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  async registerUser(userDto: RegisterDto): Promise<RegisterResponse> {
    const user = await this.userRepository.getUserByEmail(userDto.email);
    if (user) {
      return { success: false, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = await this.userRepository.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return {
      success: true,
      message: "User registered successfully",
      user: newUser,
    };
  }

  async loginUser(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.getUserByEmail(loginDto.email);
    if (!user) {
      return { success: false, message: "User not found" };
    }
    // const isLocked = await this.isAccountLocked(user.email);
    // if (isLocked) {
    //   return { success: false, message: `Account is locked. Try again later.` };
    // }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!isPasswordValid) {
      // await this.incrementLoginAttempts(user.email);
      return { success: false, message: "Invalid password" };
    }
    // await this.resetLoginAttempts(user.email);

    const token = generateToken({ id: user.id, userName: user.userName });
    return {
      success: true,
      message: "User logged in successfully",
      user: user,
      token: token,
    };
  }
  // private async incrementLoginAttempts(email: string): Promise<void> {
  //   const attemptsKey = `login_attempts:${email}`;
  //   const lockKey = `lockout:${email}`;

  //   const attempts = await redisClient.incr(attemptsKey);
  //   if (attempts === 1) {
  //     await redisClient.expire(attemptsKey, LOCK_TIME);
  //   }

  //   if (attempts >= MAX_LOGIN_ATTEMPTS) {
  //     await redisClient.set(lockKey, "locked", "EX", LOCK_TIME);
  //   }
  // }
  // private async isAccountLocked(email: string): Promise<boolean> {
  //   const lockKey = `lockout:${email}`;
  //   const lockStatus = await redisClient.get(lockKey);
  //   return lockStatus !== null;
  // }

  // private async getRemainingLockTime(email: string): Promise<number> {
  //     const lockKey = `lockout:${email}`;
  //     const remainingTime = await redisClient.ttl(lockKey); // Get remaining time to live (TTL) for the lock key
  //     return remainingTime || 0; // Return remaining time or 0 if key doesn't exist
  // }

  // private async resetLoginAttempts(email: string): Promise<void> {
  //   const attemptsKey = `login_attempts:${email}`;
  //   await redisClient.del(attemptsKey);
  // }

  async logoutUser(userId: string): Promise<void> {
    console.log("Successfully logged out");
  }
}
