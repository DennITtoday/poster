import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,PrismaService],
imports:[PrismaService,PrismaClient],
})
export class UsersModule {}

