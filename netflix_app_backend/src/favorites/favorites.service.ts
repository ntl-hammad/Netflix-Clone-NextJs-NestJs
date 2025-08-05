import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepo: Repository<Favorite>,
  ) {}

  async addFavorite(dto: CreateFavoriteDto, userId: number): Promise<Favorite> {
    const favorite = this.favoriteRepo.create({
      ...dto,
      user: { id: userId },
    });
    return this.favoriteRepo.save(favorite);
  }

  async removeFavorite(id: number, userId: number): Promise<boolean> {
    const result = await this.favoriteRepo.delete({
      movieId: id,
      user: { id: userId },
    });
    return (result.affected ?? 0) > 0;
  }

  async getFavoritesByUser(userId: number): Promise<Favorite[]> {
    return this.favoriteRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
