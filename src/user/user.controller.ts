import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: UserDto) {
    return this.userService.registration(body);
  }

  @Post('signin')
  async signin(@Body() body: UserDto) {
    return this.userService.login(body);
  }
}
