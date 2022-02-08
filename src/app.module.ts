import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CouponsController } from './coupons/coupons.controller';
import { CouponsService } from './coupons/coupons.service';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    HttpModule,
  ],
  controllers: [CouponsController],
  providers: [CouponsService, ProductsService],
})
export class AppModule {}
