import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { ProductsService } from 'src/products/products.service';
import { CouponsService } from './coupons.service';
import { RequestedItemsDTO } from './dto/requestedItems.dto';

@Controller('coupon')
export class CouponsController {
  constructor(
    private readonly service: CouponsService,
    private readonly productService: ProductsService,
  ) {}

  @Post()
  async findItemsBestFit(@Body() { items_ids, amount }: RequestedItemsDTO) {
    const itemsWithPrice: Record<string, number> = await lastValueFrom(
      this.productService.getProductsPrice(items_ids).pipe(map((res) => res)),
    );
    if (this.productService.getMinPrice(itemsWithPrice) > amount)
      throw new HttpException(
        `Can't buy any products with that coupon amount`,
        HttpStatus.NOT_FOUND,
      );

    const selectedItems = this.service.calculate(itemsWithPrice, amount);
    const sumOfProducts = Object.entries(itemsWithPrice)
      .filter((x) => selectedItems.includes(x[0]))
      .reduce((acc, curr) => acc + curr[1], 0)
      .toFixed(2);

    return { items_ids: selectedItems, amount: sumOfProducts };
  }
}
