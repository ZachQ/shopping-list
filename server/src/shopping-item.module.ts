import { Module } from '@nestjs/common';
import { ShoppingItemController } from './shopping-item.controller';
import { ShoppingItemService } from './shopping-item.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [ShoppingItemController],
  providers: [ShoppingItemService, PrismaService],
})
export class ShoppingItemModule {}
