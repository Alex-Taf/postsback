import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PostController],
  providers: [LowdbService, JwtService],
})
export class PostModule {}
