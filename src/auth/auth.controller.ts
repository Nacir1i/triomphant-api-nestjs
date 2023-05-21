import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '../utils/decorators';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateInterceptor } from '../utils/interceptors';

@UseInterceptors(CreateInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth('JWT-auth')
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
}
