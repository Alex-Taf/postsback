import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [LowdbService, UserService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class UserModule {}
