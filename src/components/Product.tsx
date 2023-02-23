import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IProduct } from '../interfaces/product'
import { formatCurrency } from '../utility/currencyFormater'

function Product({ id, name, description, price, images, isHome }: IProduct) {
  const quantity = 0
  return (
    <Card className="">
      <Link to={`/product/${id}`} className="">
        <Card.Img
          src={images[0]?.image_url}
          alt={name}
          variant="top"
          height="200px"
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column bg-secondary" >
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {!isHome && <Card.Text> {description} </Card.Text>}
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100">+ Add To Cart</Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '.5rem' }}
            >
              <div className="d-flex align-items-center justify-content-center"style={{ gap: '.5rem' }}>
                <Button variant="outline-primary">-</Button>
                <div>
                  <span className='fs-3'>{quantity}</span> in Cart
                </div>
                  
                <Button variant="outline-primary">+</Button>
              </div>
              <Button variant="outline-success">Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
export default Product
