import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from './exception'
import { TransformInterceptor } from './intercepter'
import { corsOptions } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors(corsOptions)

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())

  // swagger configuration
  const swaggerConfig = new DocumentBuilder().setTitle('Api').setVersion('0.1').build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
