import { Injectable } from '@nestjs/common';
import { Products } from 'src/products/products.class';

@Injectable()
export class CouponsService {
  calculate(items: Record<string, number>, amount: number): string[] {
    //delete products that can't be purchase with the coupon amount
    const validItems = Object.entries(items).filter(
      (item) => item[1] <= amount,
    );

    //algorithm O(n k)
    console.time('algorithm');

    //initialize variables
    let optimal = new Products();
    const sums = new Set<Products>();
    sums.add(optimal);

    //loop through each product {id,price}
    validItems.forEach(([productId, price]) => {
      //initialize new set to save new sums if they meet the conditions (<= coupon amount)
      const newSums = new Set<Products>();

      //loop through all saved sums (less or equal to coupon amount)
      sums.forEach((sum) => {
        //initialize new products list with the ones that have the next sum
        const productsList: string[] = [...sum.products];
        //push the next productId
        productsList.push(productId);

        //Create new object with the new sum and product list
        const newSum = new Products(sum.amount + price, productsList);

        //ignore sums that are not less or equal to available amount
        if (newSum.amount <= amount) {
          newSums.add(newSum);

          //update optimal object in case the amount is bigger than previous one
          if (newSum.amount > optimal.amount) {
            optimal = { ...newSum };
          }
        }
      });

      //add to the sums set all the new sums
      newSums.forEach((val) => sums.add(val));
    });

    console.timeEnd('algorithm');
    return [...optimal.products];
  }
}


