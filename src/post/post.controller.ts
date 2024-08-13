import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import * as arrayPaginate from 'array-paginate';

@Controller('post')
export class PostController {
  constructor(private readonly lowdbService: LowdbService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: PostDto) {
    const createdPost = await this.lowdbService.add(body, 'posts');

    const posts = await this.lowdbService.findAll('posts');
    const paginatedItems = arrayPaginate(posts, 1, 3);
    const totalPages = paginatedItems.totalPages;

    return { totalPages, post: createdPost };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() body: PostDto) {
    const updatedPost = this.lowdbService.update(id, body, 'posts');
    return updatedPost;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.lowdbService.delete(id, 'posts');
  }

  @Get('get')
  async getPosts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const posts = await this.lowdbService.findAll('posts');
    const paginatedItems = arrayPaginate(posts, page, limit);
    return paginatedItems;
  }

  @Get('get/:id')
  async getOnePost(@Param('id') id: string) {
    const post = await this.lowdbService.findById(id, 'posts');
    return post;
  }
}
