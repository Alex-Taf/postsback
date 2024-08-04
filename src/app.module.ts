import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LowdbService } from './lowdb/lowdb.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    JwtModule,
  ],
  controllers: [UserController, PostController],
  providers: [LowdbService, UserService, PostService],
})
export class AppModule {}
