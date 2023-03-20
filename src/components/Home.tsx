import React from 'react'
import { IProduct } from '../interfaces/product'
import Product from './Product'
import { baseUrl } from '../config'
import { Row, Col, Container, Image } from 'react-bootstrap'
import { ICart } from '../interfaces/cart'
import Hero from '../../assets/img/Hero.png'
import { IUser } from '../interfaces/user'

type Products = null | Array<IProduct>

function Home({
  fetchCart,
  cart, user
}: {
  cart: ICart | null
  fetchCart: () => void
  user: IUser | null | undefined
}) {
  const [Products, updateProducts] = React.useState<Products>(null)

  React.useEffect(() => {
    // console.log('The Home Page has mounted')
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/products`)
      const ProductsData = await resp.json()
      updateProducts(ProductsData)
      console.log(user)
    }
    fetchProducts()
  }, [])
  if (!Products) return <h1>Loading...</h1>
  return (
    <>
      <Container>
      <Image src={Hero} className="rounded mb-3" fluid={true} style={{width:"100%"}}/>
       {/* mapping over the products and rendering them, if the user is not logged in or user role is customer, only show the products that are in stock, else show all products. */}
        <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-3">

          {Products?.map(product => ( !user || user?.role_id > 3 ?
            product.in_stock && <Col key={product.id}>
              {
                <Product {...product} fetchCart={fetchCart} cart={cart} />
              }
            </Col> :  <Col key={product.id}>
              {
                <Product {...product} fetchCart={fetchCart} cart={cart} />
              }
            </Col>
              ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
