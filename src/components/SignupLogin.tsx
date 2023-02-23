import axios from 'axios'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../config'
import { IUser } from '../interfaces/user'

function SignUpLogin({ fetchUser }: { fetchUser: Function }) {
  
  const navigate = useNavigate()

  const [formDataLogin, setFormDataLogin] = useState<Partial<IUser>>({
    email: '',
    password: ''
  })

  const [formDataSignup, setFormDataSignup] = useState<Partial<IUser>>({
    username: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmitLogin(e: SyntheticEvent) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/login`, formDataLogin)
      const token: string = data.token
      localStorage.setItem('token', token)
      fetchUser()
      navigate('/')
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  async function handleSubmitSignup(e: SyntheticEvent) {
    e.preventDefault()
    try {
      if (formDataSignup.password !== formDataSignup.confirm_password) {
        setErrorMessage('Passwords do not match')
        return 
      }
      await axios.post(`${baseUrl}/signup`, formDataSignup)
      // console.log(resp);
      
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  function handleChangeLogin(event: ChangeEvent<HTMLInputElement>): void {
    const newFormDataLogin = structuredClone(formDataLogin)

    newFormDataLogin [event.target.name] = event.target.value 
    
    type T = typeof newFormDataLogin
    console.log(newFormDataLogin)

    setFormDataLogin(newFormDataLogin)
    setErrorMessage('')
  }

  function handleChangeSignup(event: ChangeEvent<HTMLInputElement>): void {
    const newFormDataSignup: Partial<IUser> = structuredClone(formDataSignup)
    newFormDataSignup[event.currentTarget.name] = event.currentTarget.value
   
    
    console.log(newFormDataSignup)

    setFormDataSignup(newFormDataSignup)
    setErrorMessage('')
  }
  return (
    <Container className="bg-secondary p-3 ">
      <Row xs={1} sm={1} md={1} lg={2} className="g-3">
        <Col>
          <h1>Login</h1>
          <Form onSubmit={handleSubmitLogin}>
            <Form.Group className="mb-3" controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChangeLogin}
                value={formDataLogin.email}
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChangeLogin}
                value={formDataLogin.password}
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmitSignup}>
            <Form.Group className="mb-3" controlId="formSignupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                onChange={handleChangeSignup}
                value={formDataSignup.username}
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                onChange={handleChangeSignup}
                value={formDataSignup.name}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="surname"
                onChange={handleChangeSignup}
                value={formDataSignup.surname}
                name="surname"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="phone"
                onChange={handleChangeSignup}
                value={formDataSignup.phone}
                name="phone"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChangeSignup}
                value={formDataSignup.email}
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChangeSignup}
                value={formDataSignup.password}
                name="password"
              />
              <Form.Text className="text-muted">
                {errorMessage}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSignupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={handleChangeSignup}
                value={formDataSignup.confirm_password}
                name="confirm_password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpLogin
