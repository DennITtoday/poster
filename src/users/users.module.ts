import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma.service";
import { PostsService } from "src/posts/posts.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PostsService, PrismaService], //added postsService 
  imports: [PrismaService],
})
export class UsersModule {}
