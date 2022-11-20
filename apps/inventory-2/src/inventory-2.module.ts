import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Inventory2Controller } from './inventory-2.controller';
import { Inventory2Service } from './inventory-2.service';
import { Inventory2Resolver } from './inventory-2.resolver';

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
  controllers: [Inventory2Controller],
  providers: [Inventory2Resolver, Inventory2Service],
})
export class Inventory2Module {}
