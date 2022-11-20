import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Inventory1Module } from './inventory-1.module';

const { RABBIT_MQ_URI, RABBIT_MQ_QUEUE_NAME } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(Inventory1Module);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_MQ_URI],
      queue: RABBIT_MQ_QUEUE_NAME,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
