import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly lowdbService: LowdbService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: PostDto) {
    const createdPost = await this.lowdbService.add(body, 'posts');
    return createdPost;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: PostDto) {
    const updatedPost = this.lowdbService.update(id, body, 'posts');
    return updatedPost;
  }

  @Get('get')
  async getPosts() {
    const posts = await this.lowdbService.findAll('posts');
    return posts;
  }
}
