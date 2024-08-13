import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { JwtService } from '@nestjs/jwt';
import { LowdbService } from 'src/lowdb/lowdb.service';

@Module({
  controllers: [CommentController],
  providers: [LowdbService, JwtService],
})
export class CommentModule {}
