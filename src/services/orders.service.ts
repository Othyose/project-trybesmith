import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import Order from '../interfaces/order.interface';

export default class OrdersService { 
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }
}