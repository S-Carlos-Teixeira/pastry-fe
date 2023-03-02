import axios from 'axios'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../config'
import { ICart } from '../interfaces/cart'
import { ICartItem } from '../interfaces/cartItem'
import { IProduct, IProductCreate } from '../interfaces/product'
import { IUser } from '../interfaces/user'
import { formatCurrency } from '../utility/currencyFormater'

interface ShowProductProps {
  user: IUser | null
  fecthCart: () => void
  cart: ICart | null
}

function ShowProduct({ user, fecthCart, cart }: ShowProductProps) {
  const [product, updateProduct] = React.useState<IProduct | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const { productId } = useParams()
  const navigate = useNavigate()
  const [cartItem, setCartItem] = useState<ICartItem | null>(null)
  const [formDataPassword, setFormDataPassword] = useState("")
  const [formDataUpdateProd, setFormDataUpdateProd] = useState<Partial<IProductCreate>>({
    name: product?.name,
    description: product?.description,
    price: product?.price ,
    in_stock: product?.in_stock,
    image_url: ""
  })

  function handleChangeUpdateProd(event: ChangeEvent<HTMLInputElement>) {
    const newFormDataUpdateProd: Partial<IProduct> & { [key: string]: any } =
      structuredClone(formDataUpdateProd)
    if (event.target.name !== 'image_url') {
      newFormDataUpdateProd[event.target.name] = event.target.value
      // console.log(newFormDataUpdateProd)
      setFormDataUpdateProd(newFormDataUpdateProd)
    }
  }
  async function handleSubmitUpdateProd(e: SyntheticEvent) {
    e.preventDefault()
    try {
      // console.log(formDataUpdateProd)

      const token = localStorage.getItem('token')
      const { data } = await axios.put(
        `${baseUrl}/product/${product?.id}`,
        formDataUpdateProd,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // console.log(data)
      updateProduct(data)
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  async function handleDeleteProduct(e: SyntheticEvent) {
    e.preventDefault()
    try {
      // console.log(formDataUpdateProd) 
      const token = localStorage.getItem('token')
      const { data } = await axios.delete(
        `${baseUrl}/product/${product?.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }, data: {"password":`${formDataPassword}`},
        }
      )
      navigate('/')
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  async function addToCart() {
    const token = localStorage.getItem('token')
    // console.log(token)
    const { data } = await axios.post(
      `${baseUrl}/cart_item/product/${product?.id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    setCartItem(data)
    // console.log(cartItem)

    fecthCart()
  }
  async function updateCart() {
    const token = localStorage.getItem('token')
    const body = { quantity: cartItem?.quantity! - 1 }
    // console.log(body)
    // console.log(token)
    const { data } = await axios.put(
      `${baseUrl}/cart_item/${cartItem?.id}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    setCartItem(data)
    // console.log('updateCart', cartItem)
    fecthCart()
  }

  async function handleDelete() {
    const token = localStorage.getItem('token')
    // console.log(token)
    const { data } = await axios.delete(
      `${baseUrl}/cart_item/${cartItem?.id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    setCartItem(null)
    fecthCart()
  }

  React.useEffect(() => {
    // console.log('Your product is available')
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(`${baseUrl}/product/${productId}`)
      updateProduct(data)
      // console.log(data)
    }
    fetchProducts()
  }, [])
  const cartItemFromCart = cart?.products.filter(
    item => item.product_id === product?.id
  )
  // console.log(cartItemFromCart)

  const quantity = cartItemFromCart?.length ? cartItemFromCart[0].quantity : 0


  return (
    <>
      <section className="py-4">
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
                          height="500px"
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
                    <h2 className="fs-3 fw-bold text-nowrap ">
                      {product?.name}
                    </h2>
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
                        <Button className="w-100" onClick={addToCart}>
                          + Add To Cart
                        </Button>
                      </Col>
                    ) : (
                      <>
                        <Col
                          xl={4}
                          className="d-flex m-auto justify-content-center"
                        >
                          <ButtonGroup className="" style={{ gap: '.5rem' }}>
                            <Button
                              variant="outline-primary"
                              onClick={updateCart}
                            >
                              -
                            </Button>

                            <Card.Text as={ButtonGroup} className="fs-3">
                              {cartItemFromCart?.length
                                ? cartItemFromCart[0].quantity
                                : 0}
                            </Card.Text>

                            <Button
                              variant="outline-primary"
                              onClick={addToCart}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </Col>
                        <Col
                          xl={2}
                          className="d-flex m-auto justify-content-end"
                        >
                          <Button
                            variant="outline-success"
                            onClick={handleDelete}
                          >
                            Remove
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                  <hr />
                  <Card.Text className="mb-0 fs-5 fw-semibold">
                    {product?.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      { user?.role_id! <= 2 &&<section>
        <Container
          fluid={true}
          className="bg-secondary rounded rounded-3 py-3 mb-3"
          style={{ maxWidth: '30rem' }}
        >
          <Row>
            <Col>
              <h2>Update Product</h2>
              <Form onSubmit={handleSubmitUpdateProd}  >
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    onChange={handleChangeUpdateProd}
                    value={formDataUpdateProd.name}
                    name="name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea"
                    
                    placeholder="Enter description"
                    onChange={handleChangeUpdateProd}
                    value={formDataUpdateProd.description}
                    name="description"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    onChange={handleChangeUpdateProd}
                    value={formDataUpdateProd.price}
                    name="price"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    label="In Stock"
                    type="checkbox"
                    onChange={e => {
                      setFormDataUpdateProd({
                        ...formDataUpdateProd,
                        in_stock: e.target.checked
                      })
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    onChange={e => {
                      setFormDataUpdateProd({
                        ...formDataUpdateProd,
                        image_url: e.target.value
                      })
                    }}
                  />
                </Form.Group>
                <Button type="submit" className="my-3 btn btn-primary">
                  Update Product
                </Button>
                
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={e => setFormDataPassword( e.target.value )} 
                    
                  />
                </Form.Group>
                <Button className="mt-3" variant="outline-success" onClick={handleDeleteProduct}>Remove</Button>

              </Form>
            </Col>
          </Row>
        </Container>
      </section>}
    </>
  )
}

export default ShowProduct
