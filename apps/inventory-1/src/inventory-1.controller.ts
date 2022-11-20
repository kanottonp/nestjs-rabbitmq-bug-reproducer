import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Inventory1Service } from './inventory-1.service';

@Controller()
export class Inventory1Controller {
  constructor(private readonly inventory1Service: Inventory1Service) {}

  @MessagePattern('get-item-1')
  async handleMessageItemsGet(@Payload() data, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return this.inventory1Service.getItems1();
  }

  @EventPattern('get-item-1')
  async handleEventItemsGet(@Payload() data, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return this.inventory1Service.getItems1();
  }
}
