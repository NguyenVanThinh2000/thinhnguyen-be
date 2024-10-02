import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from '@/intercepter'
import { HttpExceptionFilter } from '@/exception'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://local.thinhnguyen.me:5174'],
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  })

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())

  // swagger configuration
  const swaggerConfig = new DocumentBuilder().setTitle('Api').setVersion('0.1').build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
