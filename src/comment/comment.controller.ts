import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly lowdbService: LowdbService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CommentDto) {
    const createdComment = await this.lowdbService.add(body, 'comments');
    return createdComment;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.lowdbService.delete(id, 'comments');
  }

  @Get('get/:postId')
  async getOnePost(@Param('postId') postId: string) {
    const comments = await this.lowdbService.filterById(postId, 'comments');
    return comments;
  }
}
