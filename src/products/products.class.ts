export class Products {
    public amount: number;
    public products: string[];
    constructor(amount: number = 0, products: string[] = []) {
      this.amount = amount;
      this.products = products;
    }
  }
  