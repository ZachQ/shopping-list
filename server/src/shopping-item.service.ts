import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ShoppingItem } from '../generated/prisma/client';

@Injectable()
export class ShoppingItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createShoppingItem(data: { itemName: string; quantity: number; description: string }): Promise<ShoppingItem> {
    return this.prisma.shoppingItem.create({
      data,
    });
  }

  async getAllShoppingItems(): Promise<ShoppingItem[]> {
    return this.prisma.shoppingItem.findMany();
  }

  async getShoppingItemById(id: string): Promise<ShoppingItem | null> {
    return this.prisma.shoppingItem.findUnique({
      where: { id },
    });
  }

  async updateShoppingItem(id: string, data: { itemName: string; quantity: number; description: string; completed: boolean }): Promise<ShoppingItem> {
    return this.prisma.shoppingItem.update({
      where: { id },
      data,
    });
  }

  async deleteShoppingItem(id: string): Promise<ShoppingItem> {
    return this.prisma.shoppingItem.delete({
      where: { id },
    });
  }
}
