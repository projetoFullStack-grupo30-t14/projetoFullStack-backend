import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const nestConfig = new DocumentBuilder()
    .setTitle('MotorShop API')
    .setDescription('The API developed to allow users to buy and sell cars')
    .setVersion('1.0')
    .addTag('login')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, nestConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
