import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserUpdateDto {
    id!: string;

    @IsNotEmpty({ message: 'Full name is required' })
    @Length(1, 128, { message: 'Full name must be between 1 and 128 characters' })
    @IsString()
    fullName!: string;

    @IsNotEmpty({ message: 'Username is required' })
    @Length(1, 128, { message: 'Username must be between 1 and 128 characters' })
    @IsString()
    userName!: string;

    @IsEmail({}, { message: 'Email must be valid' })
    @Length(1, 128, { message: 'Email must be between 1 and 128 characters' })
    email!: string;

}
