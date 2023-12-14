import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
    app.enableCors({ origin: process.env.UI_HOST });
    // app.useBodyParser('urlencoded', { limit: '10mb' });
    await app.listen(process.env.API_PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
