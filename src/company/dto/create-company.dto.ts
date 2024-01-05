import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;
  @IsNotEmpty()
  @IsString()
  companyLogo: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfProducts: number;

  @IsNumber()
  @IsNotEmpty()
  numberOfUsers: number;

  @IsNumber()
  @IsNotEmpty()
  percentage: number;
}
