import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(
    email: string,
    password: string,
    name: string,
    address: string,
    phone: string,
  ) {
    const user = this.repo.create({ email, password, name, address, phone });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async getUserProfile(userId: number) {
    return this.repo.findOne({
      where: { id: userId },
      select: [
        'id',
        'email',
        'name',
        'address',
        'phone',
        'role',
        'status',
        'datetime',
      ],
    });
  }
}
