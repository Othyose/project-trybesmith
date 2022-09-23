import { sign } from 'jsonwebtoken';
import connection from '../models/connection';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/users.model';

const secret = 'itsAsecret';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create(user: User): string {
    const created = this.model.create(user);
    return sign({ data: { created } }, secret, {
      expiresIn: '7d',
    });
  }
}