import { useNavigate } from 'react-router-dom'
import { IUser } from '../interfaces/user'
import logo from '../../assets/img/logo.svg'
import { Button, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'
import { NavLink } from 'react-router-dom'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import Cart from './Cart'
import { useState } from 'react'
import { ICart } from '../interfaces/cart'

interface NavbarProps {
  user: IUser | null
  show: boolean
  cart: ICart | null
  setUser: Function
  setShow: Function
  setCart: Function
}

function Navbar({ user, setUser, show, setShow, cart, setCart}: NavbarProps) {
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    setCart(null)
    navigate('/')
  }
  return (
    <>
      <header className="h-50 fs-3 fw-bold">
        <NavbarBs className="shadow-md " sticky="top" expand="md">
          <Container fluid>
            <NavbarBs.Brand as={NavLink} to="/" className=" me-5">
              <img
                className="img-fluid "
                src={logo}
                alt="logo"
                style={{ width: '5rem' }}
              />
            </NavbarBs.Brand>
            <NavbarBs.Toggle aria-controls="navbarScroll" />
            <NavbarBs.Collapse id="navbarScroll ">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link as={NavLink} to="/" className="">
                  Home
                </Nav.Link>
                {user?.role_id! <= 2 && (
                  <Nav.Link as={NavLink} to="/addproduct" className="">
                    Create a product
                  </Nav.Link>
                )}
              </Nav>
              {user && (
                <Button
                  className="rounded-circle mx-2 d-flex align-items-center"
                  variant="outline-primary"
                  style={{
                    width: '3rem',
                    height: '3rem'
                  }}
                  onClick={logout}
                >
                  <RiLogoutBoxRFill
                    style={{ width: '3rem', height: '3rem' }}
                  ></RiLogoutBoxRFill>
                </Button>
              )}
              {!user && (
                <Button
                  className="rounded-circle mx-2"
                  variant="outline-primary"
                  style={{
                    width: '3rem',
                    height: '3rem'
                  }}
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
                  </svg>
                </Button>
              )}
              {user&&<Button
                style={{ width: '3rem', height: '3rem', position: 'relative' }}
                variant="outline-primary"
                className="rounded-circle mx-2 my-2"
                onClick={()=>{setShow(true)}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>
                <div
                  className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
                  style={{
                    color: 'white',
                    width: '1.5rem',
                    height: '1.5rem',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: 'translate(25%, 25%)'
                  }}
                >
                  {cart?.products?.length}
                </div>
              </Button>}
            </NavbarBs.Collapse>
          </Container>
        </NavbarBs>
      </header>
      
    </>
  )
}

export default Navbar


