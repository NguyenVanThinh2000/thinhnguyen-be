import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TaskModule } from './task'
import { configurations, mongodbConfig } from './config'

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
      load: [configurations],
    }),
    MongooseModule.forRootAsync(mongodbConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
