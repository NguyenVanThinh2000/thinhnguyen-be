import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from './exception'
import { TransformInterceptor } from './intercepter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://local.thinhnguyen.me:5174', 'https://thinhnvt.vercel.app/'],
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
