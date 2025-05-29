import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ShoppingItemService } from './shopping-item.service';
import { ShoppingItem } from '../generated/prisma/client';

@Controller('shopping-items')
export class ShoppingItemController {
  constructor(private readonly shoppingItemService: ShoppingItemService) {}

  @Post()
  async createShoppingItem(@Body() data: { itemName: string; quantity: number; description: string }): Promise<ShoppingItem> {
    return this.shoppingItemService.createShoppingItem(data);
  }

  @Get()
  async getAllShoppingItems(): Promise<ShoppingItem[]> {
    return this.shoppingItemService.getAllShoppingItems();
  }

  @Get(':id')
  async getShoppingItemById(@Param('id') id: string): Promise<ShoppingItem | null> {
    return this.shoppingItemService.getShoppingItemById(id);
  }

  @Put(':id')
  async updateShoppingItem(
    @Param('id') id: string,
    @Body() data: { itemName: string; quantity: number; description: string; completed: boolean },
  ): Promise<ShoppingItem> {
    return this.shoppingItemService.updateShoppingItem(id, data);
  }

  @Delete(':id')
  async deleteShoppingItem(@Param('id') id: string): Promise<ShoppingItem> {
    return this.shoppingItemService.deleteShoppingItem(id);
  }
}
