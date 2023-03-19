import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { baseUrl } from '../config'
import { ICart } from '../interfaces/cart'
import { ICartItem } from '../interfaces/cartItem'
import { IProduct } from '../interfaces/product'
import { formatCurrency } from '../utility/currencyFormater'
interface ProductProps {
  fetchCart: () => void
  cart: ICart | null
  }
function Product({ id, name, price, images, in_stock, fetchCart, cart }: Partial<IProduct> & ProductProps) {
  const [cartItem, setCartItem] = useState<ICartItem | null>(null)
  
  async function addToCart() {
    const token = localStorage.getItem('token')
    // console.log(token)
    const {data}  = await axios.post(`${baseUrl}/cart_item/product/${id}`,{} ,{
      headers: { Authorization: `Bearer ${token}` }
    })
    setCartItem(data)
    fetchCart()
  }
  async function updateCart(){
    const token = localStorage.getItem('token')
    const body = {quantity: cartItem?.quantity! - 1}
    // console.log(token)
    const {data}  = await axios.put(`${baseUrl}/cart_item/${cartItemFromCart? cartItemFromCart[0].id : undefined }`,body ,{
      headers: { Authorization: `Bearer ${token}` }
    })
    // console.log("Update",cartItem)
    
    setCartItem(data)
    fetchCart()   
  }

  async function handleDelete(){
    const token = localStorage.getItem('token')
    // console.log(token)
    const {data}  = await axios.delete(`${baseUrl}/cart_item/${cartItemFromCart? cartItemFromCart[0].id : undefined }`,{
      headers: { Authorization: `Bearer ${token}` }
    })
    setCartItem(null)
    // console.log("Remove",cartItem);
    
    fetchCart()
  }


    

  const cartItemFromCart = cart?.products.filter((product) => product.product_id === id) 
  // console.log(cartItemFromCart)
  
  const quantity = !cartItemFromCart?.length ?  0 : cartItemFromCart[0].quantity
  return (
    <Card className="">
      <Link to={`/product/${id}`}>
        <Card.Img
          src={images ? images[0].image_url : ''}
          alt={name}
          variant="top"
          height="200px"
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column bg-secondary" >
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5 fw-semibold">{name}</span>
          <span className="ms-2">{formatCurrency(price ? price : 999999999)}</span>
        </Card.Title>
        { in_stock && <div className="mt-auto">
          {quantity === 0  ? (
            <Button className="w-100" onClick={addToCart}>+ Add To Cart</Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '.5rem' }}
            >
              <div className="d-flex align-items-center justify-content-center"style={{ gap: '.5rem' }}>
                <Button variant="outline-primary" onClick={updateCart}>-</Button>
                <div>
                  <span className='fs-3'>{cartItemFromCart?.length ? cartItemFromCart[0].quantity : 0}</span>
                </div>
                  
                <Button variant="outline-primary" onClick={addToCart}>+</Button>
              </div>
              <Button variant="outline-success" onClick={handleDelete}>Remove</Button>
            </div>
          )}
        </div>}
      </Card.Body>
    </Card>
  )
}

export default Product
