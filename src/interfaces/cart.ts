import { IProduct } from "./product";

export interface ICart {
  id: number,
  user_id: number,
  products: Array<Partial<IProduct>>,
  expire_date: Date,
  is_active: boolean,
}
