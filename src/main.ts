import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';


async function main() {
  const app = await NestFactory.create(AppModule);
  //app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));

  app.enableCors({
    //Add your origins here
    origin: ["http://localhost:5173"],
  });

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }
  ));
  app.setGlobalPrefix('api/v2');
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await process.env.PORT}`);
}
main();