import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import IUser from './user.interface';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { LowdbService } from 'src/lowdb/lowdb.service';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private lowdbService: LowdbService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this._validateUser(userDto);
    if (user) {
      return this._generateToken(user);
    }
  }

  async registration(body: UserDto) {
    const { login, password } = body;
    const isUserExist = await this.lowdbService.find({ login }, 'users');
    if (isUserExist) {
      throw new HttpException(
        `You are already registered with us.`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    body.password = hashedPassword;

    const createdUser = await this.lowdbService.add(body, 'users');
    if (createdUser) {
      return this._generateToken(createdUser);
    }
  }

  private async _generateToken(user: IUser) {
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY }),
    };
  }

  private async _validateUser(userDto: UserDto) {
    const { login, password } = userDto;
    const user = await this.lowdbService.find({ login }, 'users');
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect E-mail or password.',
    });
  }
}
