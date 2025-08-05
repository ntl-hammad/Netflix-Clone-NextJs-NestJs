import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  add(@Body() dto: CreateFavoriteDto, @Request() req) {
    const userId = req.user.userId;
    return this.favoritesService.addFavorite(dto, userId);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.userId;
    console.log('Deleting favorite with ID:', id, 'for user:', userId);

    const deleted = await this.favoritesService.removeFavorite(id, userId);
    if (!deleted) {
      throw new NotFoundException(
        'Favorite not found or does not belong to user',
      );
    }
    return { message: 'Favorite removed successfully' };
  }

  @Get()
  getUserFavorites(@Request() req) {
    const userId = req.user.userId;
    return this.favoritesService.getFavoritesByUser(userId);
  }
}
