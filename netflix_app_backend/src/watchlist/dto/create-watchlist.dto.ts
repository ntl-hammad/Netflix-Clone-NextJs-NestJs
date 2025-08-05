import { IsNumber, IsString } from 'class-validator';

export class CreateWatchListDto {
  @IsNumber()
  movieId: number;

  @IsString()
  title: string;
}
