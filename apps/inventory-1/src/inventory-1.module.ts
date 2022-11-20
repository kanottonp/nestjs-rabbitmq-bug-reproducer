import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Inventory1Controller } from './inventory-1.controller';
import { Inventory1Service } from './inventory-1.service';
import { Inventory1Resolver } from './inventory-1.resolver';

const { CLIENT_MODULE_NAME, RABBIT_MQ_URI, RABBIT_MQ_QUEUE_NAME } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => error,
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    ClientsModule.register([
      {
        name: CLIENT_MODULE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [RABBIT_MQ_URI],
          queue: RABBIT_MQ_QUEUE_NAME,
          noAck: false,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [Inventory1Controller],
  providers: [Inventory1Resolver, Inventory1Service],
})
export class Inventory1Module {}
