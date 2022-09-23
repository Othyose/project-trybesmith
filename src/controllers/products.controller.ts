import { Request, Response } from 'express';
import ProductService from '../services/products.service';

export default class ProductsController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;
    const create = await this.productService.create(product);
    res.status(201).json({ item: create });
  };
} 