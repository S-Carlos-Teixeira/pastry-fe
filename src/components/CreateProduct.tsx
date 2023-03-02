import axios from 'axios'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { baseUrl } from '../config'
import { IImage } from '../interfaces/image'
import { IProduct, IProductCreate } from '../interfaces/product'
import { IUser } from '../interfaces/user'

interface createProductProps {
  user: IUser | null
}
function CreateProduct({ user }: createProductProps) {
  const [formDataCreateProd, setFormDataCreateProd] = useState<
    Partial<IProductCreate>
  >({
    name: '',
    description: '',
    price: 0,
    in_stock: false,
    image_url: ''
  })

  const [errorMessage, setErrorMessage] = useState<string>('')

  async function handleSubmitCreateProd(e: SyntheticEvent) {
    e.preventDefault()
    try {
      // console.log(formDataCreateProd)

      const token = localStorage.getItem('token')
      const { data } = await axios.post(
        `${baseUrl}/product`,
        formDataCreateProd,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // console.log(data)
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  function handleChangeCreateProd(event: ChangeEvent<HTMLInputElement>) {
    const newFormDataCreateProd: Partial<IProduct> & { [key: string]: any } =
      structuredClone(formDataCreateProd)
    if (event.target.name !== 'image_url') {
      newFormDataCreateProd[event.target.name] = event.target.value
      // console.log(newFormDataCreateProd)
      setFormDataCreateProd(newFormDataCreateProd)
      setErrorMessage('')
    }
  }
  return (
    <Container
      fluid={true}
      className="bg-secondary rounded rounded-3 py-3 mb-3"
      style={{ maxWidth: '30rem' }}
    >
      <Row>
        <Col>
          <h2>Create Product</h2>
          <Form onSubmit={handleSubmitCreateProd}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={handleChangeCreateProd}
                value={formDataCreateProd.name}
                name="name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                onChange={handleChangeCreateProd}
                value={formDataCreateProd.description}
                name="description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                onChange={handleChangeCreateProd}
                value={formDataCreateProd.price}
                name="price"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                label="In Stock"
                type="checkbox"
                onChange={e => {
                  setFormDataCreateProd({
                    ...formDataCreateProd,
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
                  setFormDataCreateProd({
                    ...formDataCreateProd,
                    image_url: e.target.value
                  })
                }}
              />
            </Form.Group>
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateProduct
