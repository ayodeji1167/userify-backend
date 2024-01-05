import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfProducts: number;

  @IsNumber()
  @IsNotEmpty()
  numberOfUsers: number;

  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  //   @OneToOne(() => User, user => user.company, { unique: true })
  //   @JoinColumn()
  //   user: User;
}
