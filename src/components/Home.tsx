import React from 'react'
import { IProduct } from '../interfaces/product'
import Product from './Product'
import { baseUrl } from '../config'
import {Row, Col} from 'react-bootstrap'

type  Products = null | Array<IProduct>

function Home() {
  const [Products, updateProducts] = React.useState<Products>(null)

  React.useEffect(() => {
    console.log('The Home Page has mounted')
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/products`)
      const ProductsData = await resp.json()
      updateProducts(ProductsData)
      console.log(ProductsData);
      
    }
    fetchProducts()
  }, [])

  return (
      <Row xs={1} md={2} lg={3} className="g-3" >
        {Products?.map((product: IProduct) => {
          return <Product key={product.id} {...product} isHome={true} />
        })}
      </Row>       
    
  )
}

export default Home