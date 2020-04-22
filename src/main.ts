import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('ATuPuerta API')
    .setDescription('ATuPuerta API Description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options, {
    include: [UserModule]
  })

  const userDocument = SwaggerModule.createDocument(app, options, {
    include: [UserModule]
  })

  SwaggerModule.setup('docs', app, document)
  SwaggerModule.setup('docs/user', app, userDocument)

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
