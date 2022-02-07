import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponsController } from './coupons/coupons.controller';
import { CouponsService } from './coupons/coupons.service';
import { ProductsService } from './products/products.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, CouponsController],
  providers: [AppService, CouponsService, ProductsService],
})
export class AppModule {}
