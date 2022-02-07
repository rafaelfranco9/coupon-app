import { Transform } from 'class-transformer';
import { IsString, IsNumber, Matches, IsPositive, } from 'class-validator';

const Pattern = '^(MLA)\\d+$';

export class RequestedItemsDTO {
  @IsString({ each: true })
  @Matches(new RegExp(Pattern), { each: true })
  readonly items_ids: string[];

  @IsNumber()
  @IsPositive()
  @Transform(({value}) => Number(value.toFixed(2)))
  readonly amount: number;
}
