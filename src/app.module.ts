import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { prisma } from "@prisma/client";
import { UsersController } from "./users/users.controller";

@Module({
  providers: [],
  imports: [UsersModule, PostsModule],
})
export class AppModule {}
