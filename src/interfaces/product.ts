import { Key } from "react"
import { IImage } from "./image"

export interface IProduct {
  name: string,
  description: string,
  price: number,
  in_stock: boolean,
  createdBy: number,
  id: number,
  isHome: boolean,
  images: Array<IImage>
} 