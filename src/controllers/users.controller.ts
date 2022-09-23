import { Request, Response } from 'express';
import UserService from '../services/users.service';

export default class UsersController {
  constructor(private userService = new UserService()) { }

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    const token = await this.userService.create(user);
    return res.status(201).json({ token });
  };
}