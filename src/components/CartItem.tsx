import { ICartItem } from "../interfaces/cartItem";
import { IProduct } from "../interfaces/product";
import { formatCurrency } from "../utility/currencyFormater";
 
function CartItem({product, quantity}: Partial<IProduct> & Partial<ICartItem>): JSX.Element{

  
  return (
    <div className="d-flex align-items-center bg-secondary rounded pe-2 border border-dark border-2">
      <img
        src={!product?.images? "" : product?.images[0].image_url}
        alt="product"
        width="100"
        height="100"
        className="me-3 rounded"
      />
      <div className="flex-grow-1">
        <h5 className="mb-1">{product?.name}</h5>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <button className="btn btn-primary btn-sm">-</button>
            <span className="mx-3">{quantity}</span>
            <button className="btn btn-primary btn-sm">+</button>
          </div>
          <div className="ms-auto fw-bold fs-5">
            {formatCurrency(product?.price || 0)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem;