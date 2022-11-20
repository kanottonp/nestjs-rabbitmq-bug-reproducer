import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inventory2Service } from './inventory-2.service';

@Resolver('Inventory2')
export class Inventory2Resolver {
  constructor(private readonly inventory2Service: Inventory2Service) {}

  @Query('itemInventory1List')
  async getInventory1() {
    return this.inventory2Service.getItems1();
  }

  @Query('itemInventory2List')
  async getInventory2() {
    return this.inventory2Service.getItems2();
  }
}
