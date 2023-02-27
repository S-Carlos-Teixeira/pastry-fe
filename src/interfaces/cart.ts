import { ICartItem } from "./cartItem";

export interface ICart {
  id: number,
  user_id: number,
  products: Array<Partial<ICartItem>>,
  expire_date: Date,
  is_active: boolean,
}
