import React from 'react'
import { IProduct } from '../interfaces/product'
import Product from './Product'
import { baseUrl } from '../config'
import { Row, Col, Container, Image } from 'react-bootstrap'
import { ICart } from '../interfaces/cart'
import Hero768 from '../../assets/img/Hero1200.png'

type Products = null | Array<IProduct>

function Home({
  fetchCart,
  cart
}: {
  cart: ICart | null
  fetchCart: () => void
}) {
  const [Products, updateProducts] = React.useState<Products>(null)

  React.useEffect(() => {
    console.log('The Home Page has mounted')
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/products`)
      const ProductsData = await resp.json()
      updateProducts(ProductsData)
      console.log(ProductsData)
    }
    fetchProducts()
  }, [])
  if (!Products) return <h1>Loading...</h1>
  return (
    <>
      {/* <div  style={{width:"100%", height:"auto" }}>
        
          <Image src={Hero768}  className="w-100 mx-auto" style={{objectFit: 'cover'}} />
       
      </div> */}
      <Container>
        <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-3">
          {Products?.map(product => (
            <Col key={product.id}>
              {product.in_stock && (
                <Product {...product} fetchCart={fetchCart} cart={cart} />
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
