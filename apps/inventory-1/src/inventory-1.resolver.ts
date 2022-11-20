import { Resolver, Query } from '@nestjs/graphql';
import { Inventory1Service } from './inventory-1.service';

@Resolver('Inventory1')
export class Inventory1Resolver {
  constructor(private readonly inventory1Service: Inventory1Service) {}

  @Query('itemInventory1List')
  async getInventory1() {
    return this.inventory1Service.getItems1();
  }

  @Query('itemInventory2List')
  async getInventory2() {
    return this.inventory1Service.getItems2();
  }
}
