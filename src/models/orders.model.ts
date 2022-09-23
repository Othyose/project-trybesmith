import { Pool, RowDataPacket } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection; 
  }

  public async getAll(): Promise<Order[]> {
    // PEGA TODAS AS ORDERS
    const [orders] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Orders;',
    );
    // BUSCA OS PRODUTOS DE ACORDO COM O 'ID' DE CADA ORDER
    const orderProducts = orders.map((order) => (this.connection.execute<RowDataPacket[]>(
      'SELECT id FROM Trybesmith.Products WHERE orderId = ?;',
      [order.id],
    )));
    // RESOLVE AS PROMISES DOS PRODUTOS
    const resProducts = await Promise.all(orderProducts);
    // ORGANIZA E RETORNA AS ORDERS JUNTO COM OS PRODUTOS
    const results = orders.map((item, i) => {
      const [products] = resProducts[i];
      const product = products.map((pro) => pro.id);
      const result: Order = { id: item.id, userId: item.userId, products: product as number[] };
      return result;
    });
    return results;
  }
}