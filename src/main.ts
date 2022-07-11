import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import './infra/datadog.tracer';
import { AppModule } from './app.module';
import { local } from '../conf';
import { v1 as uuid } from 'uuid';

function prepareOpenApi(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('S3Proxy API Docs')
    .setDescription('S3Proxy API description')
    .setVersion('1.0')
    .setBasePath('/v1')
    .addTag('S3Proxy')
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, options);
}

async function bootstrap() {
  process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  SwaggerModule.setup('/', app, prepareOpenApi(app));
  const port = local.port.default || 9000;
  await app.listen(port);

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Shutting down...');

    app
      .close()
      .then((_) => {
        console.log('S3Proxy service gracefully shutdown');
        process.exit(0);
      })
      .catch((err) => {
        console.log("Coundn't gracefully shutdown", err);
        process.exit(1);
      });
  });
}

bootstrap().catch((err: Error) => {
  console.log(`NestJS bootstrap failed: ${err}`);
});
