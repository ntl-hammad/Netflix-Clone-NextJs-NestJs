import { IsNumber, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  movieId: number;

  @IsString()
  title: string;
}
