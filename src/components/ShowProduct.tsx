import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../config'
import { ICartItem } from '../interfaces/cartItem'
import { IProduct } from '../interfaces/product'
import { IUser } from '../interfaces/user'
import { formatCurrency } from '../utility/currencyFormater'

interface ShowProductProps {
  user: IUser | null
  fecthCart: () => void
}

function ShowProduct({ user, fecthCart }: ShowProductProps) {
  const [product, updateProduct] = React.useState<IProduct | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const { productId } = useParams()
  const navigate = useNavigate()
  const [cartItem, setCartItem] = useState<ICartItem | null>(null)
  
  async function addToCart() {
    const token = localStorage.getItem('token')
    console.log(token);
    const {data}  = await axios.post(`${baseUrl}/cart_item/product/${product?.id}`,{} ,{
      headers: { Authorization: `Bearer ${token}` }
    })
    setCartItem(data)
  }
  async function updateCart(){
    const token = localStorage.getItem('token')
    const body = {quantity: cartItem?.quantity! - 1}
    console.log(token);
    const {data}  = await axios.put(`${baseUrl}/cart_item/${cartItem?.id}`,body ,{
      headers: { Authorization: `Bearer ${token}` }
    })
    setCartItem(data)   
  }

  async function handleDelete(){
    const token = localStorage.getItem('token')
    console.log(token);
    const {data}  = await axios.delete(`${baseUrl}/cart_item/${cartItem?.id}`,{
      headers: { Authorization: `Bearer ${token}` }
    })
    setCartItem(null)
  }

  // async function handleAddToCart(e: SyntheticEvent) {
  //   e.preventDefault()
  //   try {
  //     const token = localStorage.getItem('token')
  //     const { data } = await axios.post(
  //       `${baseUrl}/product/${productId}/cart`,
  //       productId,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     )
  //     console.log(productId)
  //     navigate('/')
  //   } catch (err: any) {
  //     setErrorMessage(err.response.data.message)
  //   }
  // }

  React.useEffect(() => {
    console.log('Your product is available')
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(`${baseUrl}/product/${productId}`)
      updateProduct(data)
      console.log(data)
    }
    fetchProducts()
  }, [])
  const quantity = cartItem?.quantity || 0
  return (
    <section className="">
      <Container fluid className="bg-success pb-3">
        <Row xs={1} sm={1} md={2} lg={2} xl={2} className="g-3">
          <Col>
            <Row
              xs={1}
              sm={1}
              md={2}
              lg={2}
              xl={2}
              className="g-2 justify-content-center"
            >
              {product &&
                product.images.map(image => (
                  <Col xs={8} sm={6} md={6} lg={6} xl={6}>
                    <Card key={image.id} className="mb-2 mx-2">
                      <Card.Img
                        src={image.image_url}
                        alt={product.name}
                        style={{ objectFit: 'cover' }}
                      />
                    </Card>
                  </Col>
                ))}
            </Row>
          </Col>
          <Col>
            <Card>
              <Card.Body className="d-flex flex-column bg-secondary">
                <Card.Title className=" mb-4 ">
                  <h2 className="fs-3 fw-bold text-nowrap ">{product?.name}</h2>
                  <hr />
                </Card.Title>
                <Row xs={1} sm={1} md={2} lg={2} xl={3} className="fs-2">
                  <Col xl={6} className="d-flex m-auto justify-content-start">
                    <Card.Text className="mb-0  fs-2 fw-semibold">
                      {formatCurrency(product?.price!)}
                    </Card.Text>
                  </Col>

                  {quantity === 0 ? (
                    <Col xl={6} className="d-flex justify-content-center">
                      <Button className="w-100">+ Add To Cart</Button>
                    </Col>
                  ) : (
                    <>
                      <Col
                        xl={4}
                        className="d-flex m-auto justify-content-center"
                      >
                        <ButtonGroup className="" style={{ gap: '.5rem' }}>
                          <Button variant="outline-primary">-</Button>

                          <Card.Text as={ButtonGroup} className="fs-3">
                            {quantity}
                          </Card.Text>

                          <Button variant="outline-primary">+</Button>
                        </ButtonGroup>
                      </Col>
                      <Col xl={2} className="d-flex m-auto justify-content-end">
                        <Button variant="outline-success">Remove</Button>
                      </Col>
                    </>
                  )}
                </Row>
                <hr />
                <Card.Text className="mb-0 fs-5">
                  {product?.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </section>
  )
}

export default ShowProduct
