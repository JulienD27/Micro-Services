import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import {PrismaModule} from "./prisma/prisma.module";
import {AppService} from "./app.service";
import {AppController} from "./app.controller";

@Module({
  imports: [TaskModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
