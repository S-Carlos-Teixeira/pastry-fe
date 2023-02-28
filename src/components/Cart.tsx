
import { Button, Container, Offcanvas, Stack } from 'react-bootstrap'
import { ICart } from '../interfaces/cart'
import { IUser } from '../interfaces/user'
import { formatCurrency } from '../utility/currencyFormater'
import CartItem from './CartItem'



interface CartProps {
  show: boolean
  setShow: Function
  cart: ICart | null
}

function Cart({ show, setShow, cart }: CartProps) {
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  if (!cart) return (null)
  
  return (
    <Container>
      
      <Offcanvas  className="bg-light" show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
          {cart.products.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cart.products.reduce((total, cartItem) => {
                return total + (cartItem.product?.price || 0) * (cartItem.quantity || 0)
              }, 0)
            )}
          </div>            
          </Stack>
          {cart.products.length > 0 &&<Button className="w-100 mt-3" onClick={handleClose}>Checkout</Button>}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default Cart
