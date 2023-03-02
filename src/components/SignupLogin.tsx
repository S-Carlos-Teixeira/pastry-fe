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
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email.toLowerCase())
  }
  
  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/
    return re.test(phone)
  }
  
  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return re.test(password)
  }

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
        setPasswordError('Passwords do not match')
        
      } else {
        setPasswordError('')
      }
      if (!validateEmail(formDataSignup.email!)) {
        setEmailError('Please enter a valid email address')
        
      } else {
        setEmailError('')
      }
      if (!validatePhone(formDataSignup.phone!)) {
        setPhoneError('Please enter a valid phone number')
        
      } else {
        setPhoneError('')
      }

      if (!validatePassword(formDataSignup.password!)) {
        setPasswordError('Password should be at least 8 characters long and contain at least one letter and one number')
        return
      } else {
        setPasswordError('')  
      }
      await axios.post(`${baseUrl}/signup`, formDataSignup)
      // console.log(resp);
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  function handleChangeLogin(event: ChangeEvent<HTMLInputElement>): void {
    const newFormDataLogin: Partial<IUser> & { [key: string]: any } =
      structuredClone(formDataLogin)

    newFormDataLogin[event.target.name] = event.target.value

    // console.log(newFormDataLogin)

    setFormDataLogin(newFormDataLogin)
    setErrorMessage('')
  }

  function handleChangeSignup(event: ChangeEvent<HTMLInputElement>): void {
    const newFormDataSignup: Partial<IUser> & { [key: string]: any } =
      structuredClone(formDataSignup)
    newFormDataSignup[event.currentTarget.name] = event.currentTarget.value

    // console.log(newFormDataSignup)

    setFormDataSignup(newFormDataSignup)
    setErrorMessage('')
  }
  return (
    <Container fluid={true} className="bg-secondary p-3 rounded-4">
      <Row xs={1} sm={1} md={1} lg={3} className="g-3 justify-content-space-around">
        
          <Col fluid={true}>
            <h2>Sign In to Your Account</h2>
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
              <Button variant="primary" type="submit" className='w-100'>
                Sign In
              </Button>
            </Form>
          </Col>
          <Col>
          </Col>
        
          <Col>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmitSignup}>
              <Row xs={1} sm={1} md={1} lg={2} className="g-3">
                <Col>
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
                </Col>
                <Col>
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
                </Col>
              </Row>
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
              <Form.Group className="mb-3" controlId="formSignupPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="phone"
                  onChange={handleChangeSignup}
                  value={formDataSignup.phone}
                  name="phone"
                />
                <Form.Text className="text-muted">{phoneError}</Form.Text>
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
                  {emailError}
                </Form.Text>
              </Form.Group>
              <Row xs={1} sm={1} md={1} lg={2} className="g-3">
                <Col>
                  <Form.Group className="mb-3" controlId="formSignupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={handleChangeSignup}
                      value={formDataSignup.password}
                      name="password"
                    />
                    <Form.Text className="text-muted">{passwordError}</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="formSignupConfirmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleChangeSignup}
                      value={formDataSignup.confirm_password}
                      name="confirm_password"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className='w-100'>
                Join us !
              </Button>
            </Form>
          </Col>
        
      </Row>
    </Container>
  )
}

export default SignUpLogin
