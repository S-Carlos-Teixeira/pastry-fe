
import { Button, Container, Offcanvas, Stack } from 'react-bootstrap'
import { IUser } from '../interfaces/user'
import { formatCurrency } from '../utility/currencyFormater'


interface CartProps {
  show: boolean
  setShow: Function
}

function Cart({ show, setShow }: CartProps) {
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <Container>
      <Button variant="primary" onClick={handleShow} >
        Launch
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
          {/* {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))} */}
          {/* <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>             */}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default Cart
