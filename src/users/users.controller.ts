//here was usersController

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { User as UserModel, Post as PostModel } from "@prisma/client";
import { PostsService } from "src/posts/posts.service";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController { // this was AppController 
  constructor(
    private readonly userService: UsersService,
    private readonly postService: PostsService
  ) {}

  @Get("post/:id")
  async getPostById(@Param("id") id: string): Promise<PostModel> {
    return this.postService.postNumber({ id: id });
  }

  @Get("feed")
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get("filtered-posts/:searchString")
  async getFilteredPosts(
    @Param("searchString") searchString: string
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

  @Post("post")
  async createDraft(@Body() postData: { title: string }) {
    const { title } = postData;
    await this.postService
      .createPost({
        title,
        author: {
          connect: {},
        },
      })
      .catch((e) => console.log(e)); // catch error if some user enter bad values
    return { message: "created post" }; // cant return user because its undefined
  }

  @Post("/user")
  async signupUser(
    @Body() userData: { name: string; email: string; telephoneNumber: number }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put("publish/:id")
  async publishPost(@Param("id") id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete("post/:id")
  async deletePost(@Param("id") id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
