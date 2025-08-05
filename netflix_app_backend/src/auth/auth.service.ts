import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/Login.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name, address, phone } = signupDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      name,
      address,
      phone,
      password: hashedPassword,
      status: 'active',
    });

    await this.userRepository.save(user);

    return { message: 'Signup successful' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }

  async sendResetPasswordLink(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600 * 1000);

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await this.userRepository.save(user);

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    console.log('Reset Password Link:', resetUrl);

    return { message: 'Reset link sent (check console)' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { resetToken: token },
    });
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Token is invalid or expired');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await this.userRepository.save(user);
    return { message: 'Password has been reset successfully' };
  }
}
