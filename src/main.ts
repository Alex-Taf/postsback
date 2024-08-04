import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function run(port: number | string) {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(
    port,
    () => `Server on port ${port} is running successfully`,
  );
}

run(process.env.PORT);
