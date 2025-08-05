import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { CreateWatchListDto } from './dto/create-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private watchlistRepo: Repository<Watchlist>,
  ) {}

  async addToWatchlist(
    dto: CreateWatchListDto,
    userId: number,
  ): Promise<Watchlist> {
    const watchlistItem = this.watchlistRepo.create({
      ...dto,
      user: { id: userId },
    });
    return this.watchlistRepo.save(watchlistItem);
  }

  async removeFromWatchlist(movieId: number, userId: number): Promise<boolean> {
    const result = await this.watchlistRepo.delete({
      movieId,
      user: { id: userId },
    });
    return (result.affected ?? 0) > 0;
  }

  async getWatchlistByUser(userId: number): Promise<Watchlist[]> {
    return this.watchlistRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
