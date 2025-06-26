import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export interface IUserPayload {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Ro'yhatdan o'tish
  async register(dto: RegisterDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existingUser) throw new ConflictException('Email allaqachon ro‘yxatda');

    const newUser = this.userRepo.create(dto);
    await this.userRepo.save(newUser);

    return {
      message: 'Ro‘yxatdan muvaffaqiyatli o‘tdingiz',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.created_at,
      },
    };
  }

  // Login qilish
  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Foydalanuvchi topilmadi');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Parol noto‘g‘ri');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      message: 'Muvaffaqiyatli tizimga kirdingiz',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
      },
      access_token,
      refresh_token,
    };
  }

  // Token yangilash
  async refresh(req: Request, res: Response) {
    const refresh_token = req.cookies?.refresh_token;
    if (!refresh_token) throw new UnauthorizedException('Token topilmadi');

    const payload = await this.jwtService.verifyAsync(refresh_token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const user = await this.userRepo.findOneBy({ id: payload.sub });
    if (!user) throw new UnauthorizedException('Foydalanuvchi topilmadi');

    const newAccessToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      },
    );

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Access token yangilandi' };
  }

  // Profil olish
  async getProfile(user: IUserPayload) {
    return this.userRepo.findOne({
      where: { id: user.id, email: user.email },
      select: ['id', 'name', 'email', 'role', 'created_at'],
    });
  }
}
