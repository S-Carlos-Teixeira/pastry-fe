import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../interfaces/user'
import { baseUrl } from '../config'
import logo from '../../assets/img/logo.svg'
import { Button, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'
import { NavLink } from 'react-router-dom'

interface NavbarProps {
  user: IUser | null
  setUser: Function
}

function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }
  return (
    <>
      <header className="mb-3">
        <NavbarBs className="shadow-sm " sticky='top'>
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" className="navbar-brand me-5">
                <img
                  className="img-fluid "
                  src={logo}
                  alt="logo"
                  style={{ width: '7rem' }}
                />
              </Nav.Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link ">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    {user?.role_id! >= 2 && (
                      <Link to="/addproduct" className="nav-link">
                        Add product
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {user && (
                      <Link to="/cart" className="nav-link">
                        Cart
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {user && (
                      <Link to="/order" className="nav-link">
                        Order
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {!user && (
                      <Link to="/signup" className="nav-link">
                        Sign Up
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {!user && (
                      <Link to="/login" className="nav-link">
                        Log In
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    {user && (
                      <button onClick={logout} className="nav-link btn">
                        Logout
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </Nav>
            <Button style={{width: "3rem", height: "3rem", position: "relative"}} variant="outline-primary" className='rounded-circle'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div className='rounded-circle bg-secondary d-flex justify-content-center align-items-center' style={{color:"white", width:"1.5rem", height:"1.5rem", position: "absolute", bottom:0, right: 0, transform:"translate(25%, 25%)"}}>
                3
            </div>
            </Button>
          </Container>
        </NavbarBs>
      </header>
    </>
  )
}

export default Navbar