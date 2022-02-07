import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import {
  catchError,
  firstValueFrom,
  lastValueFrom,
  map,
  Observable,
  tap,
} from 'rxjs';
import { EncodeURI } from 'src/common/helpers';
import { IProducts } from './products.interface';

@Injectable()
export class ProductsService {
  private API: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.API = this.configService.get<string>('API_MELI');
  }

  getProductsPrice(items_ids: string[]): Observable<any> {
    return this.httpService.get(EncodeURI(this.API, items_ids)).pipe(
      map((response: AxiosResponse<any[]>) => {
        const validProducts = response.data.filter((data) => data.code == 200);
        if (!validProducts.length)
          throw new NotFoundException('No ids were found');
        return validProducts.map((p) => p.body);
      }),
      map((products: IProducts[]) => {
        return products.reduce((prev, curr) => {
          prev[curr.id] = curr.price;
          return prev;
        }, {});
      }),
      catchError((err) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }

  getMinPrice(items: Record<string, number>): number {
    return Object.values(items).reduce((min, val) => (val < min ? val : min));
  }
}
