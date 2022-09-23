import connection from '../models/connection';
import { Product } from '../interfaces/product.interface';
import ProductModel from '../models/products.model';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public create(product: Product): Promise<Product> {
    return this.model.create(product);
  }
}
