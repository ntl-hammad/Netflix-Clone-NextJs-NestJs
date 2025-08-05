import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async fetchTrendingMovies() {
    const url = 'https://api.tvmaze.com/shows';

    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
