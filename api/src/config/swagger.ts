import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Plants care')
    .setDescription('The plants-care API description')
    .setVersion('1.0')
    .addTag('plants-care')
    .build();
