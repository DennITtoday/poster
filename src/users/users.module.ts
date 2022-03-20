import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,PrismaService],
imports:[PrismaService],
})
export class UsersModule {}

