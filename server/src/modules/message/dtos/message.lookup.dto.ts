import { IsOptional, IsUUID, IsDateString } from "class-validator";

export class MessageLookupDto {
    @IsOptional()
    @IsUUID('4', { message: 'User ID must be a valid UUID' })
    userId?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Start date must be a valid date' })
    startDate?: string;

    @IsOptional()
    @IsDateString({}, { message: 'End date must be a valid date' })
    endDate?: string;
}