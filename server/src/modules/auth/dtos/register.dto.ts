import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterDto {

    @IsNotEmpty({ message: 'Full name is required' })
    @Length(1, 128, { message: 'Full name must be between 1 and 128 characters' })
    fullName!: string;

    @IsNotEmpty({ message: 'Username is required' })
    @Length(1, 128, { message: 'Username must be between 1 and 128 characters' })
    userName!: string;

    @IsEmail({}, { message: 'Email must be valid' })
    @Length(1, 128, { message: 'Email must be between 1 and 128 characters' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 128, { message: 'Password must be between 6 and 128 characters' })
    password!: string;

    

    
    
}