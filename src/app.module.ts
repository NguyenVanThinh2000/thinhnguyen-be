import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TaskModule } from '@/task'
import { configurations, mongodbConfig } from '@/config'
import { MongooseModule } from '@nestjs/mongoose'

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
})
export class AppModule {}
