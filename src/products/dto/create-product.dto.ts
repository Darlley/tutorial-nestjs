import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  price: string;

  @IsString()
  password: string;
}
