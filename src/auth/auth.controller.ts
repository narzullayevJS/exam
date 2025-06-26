import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService, IUserPayload } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth('access_token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, ...rest } =
      await this.authService.login(dto);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    res.cookie('access_token', access_token, cookieOptions);
    res.cookie('refresh_token', refresh_token, cookieOptions);

    return { access_token, refresh_token, ...rest };
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: { user: IUserPayload }) {
    return this.authService.getProfile(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }
}
