import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Inventory2Service } from './inventory-2.service';

@Controller()
export class Inventory2Controller {
  constructor(private readonly inventory2Service: Inventory2Service) {}

  @MessagePattern('get-item-2')
  async handleItemsGet(@Payload() data, @Ctx() context: RmqContext) {
    const result = await this.inventory2Service.getItems2();
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return result;
  }
}
