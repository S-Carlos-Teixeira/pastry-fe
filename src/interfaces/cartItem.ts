import { IProduct } from "./product";

export interface ICartItem {
  id: number,
  product_id: number,
  cart_id: number,
  quantity: number,
  product: IProduct,
}