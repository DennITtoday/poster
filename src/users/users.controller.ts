import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {}
import {
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
        where: { published: true },
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
              content: { contains: searchString },
            },
          ],
        },
      });
    }
    
    @Post('post')
    async createDraft(
      @Body() postData: {  title: string;  },
    ): Promise<PostModel> {
      const {  title } = postData;
      return this.postService.createPost({
       
        title,
        author: {
          connect: {  },
        },
      });
    }
    @Post('/user')
    async signupUser(
      @Body() userData: { name: string; email: string; telephoneNumber:number;},
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }

    @Put('publish/:id')
    async publishPost(@Param('id') id: string): Promise<PostModel> {
      return this.postService.updatePost({
        where: { id: Number(id) },
        data: { published: true },
      });
    }

    @Delete('post/:id')
    async deletePost(@Param('id') id: string): Promise<PostModel> {
      return this.postService.deletePost({ id: Number(id) });
    }
  }