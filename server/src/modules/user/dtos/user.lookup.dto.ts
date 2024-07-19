import { IsNotEmpty, Length, IsEmail, } from "class-validator";

export class UserLookupDto {
    id?: string;

    @IsNotEmpty({ message: 'Full name is required' })
    @Length(1, 128, { message: 'Full name must be between 1 and 128 characters' })
    fullName?: string;

    @IsNotEmpty({ message: 'Full name is required' })
    @Length(1, 128,)
    userName?: string;

    @IsEmail({}, { message: 'Email must be valid' })
    @Length(1, 128, { message: 'Email must be between 1 and 128 characters' })
    email?: string;

}