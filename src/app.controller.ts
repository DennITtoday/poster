import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UsersService } from 'src/users/users.service';
  import { PostsService } from 'src/posts/posts.service';
  import { User as UserModel, Post as PostModel } from '@prisma/client';

  @Controller()
  export class AppController {
    constructor(
      private readonly userService: UsersService,
      private readonly postService: PostsService,
    ) {}

    @Get('post/:id')
    async getPostById(@Param('id') id: string): Promise<PostModel> {
      return this.postService.postNumber({ id: (id) });
    }

    @Get('feed')
    async getPublishedPosts(): Promise<PostModel[]> {
      return this.postService.posts({
        where: { Published: true },
      });
    }

    @Get('filtered-posts/:searchString')
    async getFilteredPosts(
      @Param('searchString') searchString: string,
    ): Promise<PostModel[]> {
      return this.postService.posts({
        where: {
          OR: [
            {
              PostText: { contains: searchString },
            },
          ],
        },
      });
    }
    
    @Post('post')
    async createDraft(
      @Body() postData: {  PostText?: string;  },
    ): Promise<PostModel> {
      const {  PostText } = postData;
      return this.postService.createPost({
       
        PostText,
        authorID: {
          connect: {  },
        },
      });
    }

    @Put('publish/:id')
    async publishPost(@Param('id') id: string): Promise<PostModel> {
      return this.postService.updatePost({
        where: { PostId: Number(id) },
        data: { Published: true },
      });
    }

    @Delete('post/:id')
    async deletePost(@Param('id') id: string): Promise<PostModel> {
      return this.postService.deletePost({ PostId: Number(id) });
    }
  }