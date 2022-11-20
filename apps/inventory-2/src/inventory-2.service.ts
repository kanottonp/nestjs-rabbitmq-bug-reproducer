import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

const { CLIENT_MODULE_NAME } = process.env;

@Injectable()
export class Inventory2Service implements OnApplicationBootstrap {
  constructor(@Inject(CLIENT_MODULE_NAME) private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async getItems2() {
    return [{ id: "1", name: "inventory-1-item"}]
  }

  async getItems1() {
    return this.client.send('get-item-1', new RmqRecordBuilder({}));
  }
}
