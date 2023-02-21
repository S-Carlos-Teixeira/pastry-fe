import React from 'react'
// import { IProduct } from '../interfaces/product'
// import Product from './Product'
import { baseUrl } from '../config'

type Products = null | Array<IProduct>

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
    }
    fetchProducts()
  }, [])

  return (
    <section className="">
      <h2>some text</h2>
      {/* <div className="">
        <div className="">

        </div>
      </div>
      
      <div className="bg-warning p-4 ">
      <h2 className="text-center">Browse Products</h2>
        <div className="container bg-body rounded-4 ">
          <div className=" justify-content-center d-flex flex-column ">
            {Products?.map((product: IProduct) => {
              return <Product key={product._id} {...product} isHome={true} />
            })}
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default Home