import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PostsController],
  providers: [PostsService,PrismaService],
  imports:[PrismaService,]
})
export class PostsModule {}
