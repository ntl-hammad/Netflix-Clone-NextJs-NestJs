import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateWatchListDto } from './dto/create-watchlist.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  addToWatchlist(@Req() req, @Body() dto: CreateWatchListDto) {
    const userId = req.user.userId;
    return this.watchlistService.addToWatchlist(dto, userId);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id', ParseIntPipe) movieId: number) {
    const userId = req.user.userId;
    return this.watchlistService.removeFromWatchlist(movieId, userId);
  }

  @Get()
  findUserWatchlist(@Req() req) {
    const userId = req.user.userId;
    return this.watchlistService.getWatchlistByUser(userId);
  }
}
