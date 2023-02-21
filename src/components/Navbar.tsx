import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../interfaces/user'
import { baseUrl } from '../config'
// import logo from '../resources/img/logo-no-bg.png'
import { Nav, Navbar as NavbarBs } from 'react-bootstrap'
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
      <header className="bg-info ">
        <NavbarBs className="shadow-sm">
          <Container>
            <Nav>
              <Nav.Link as={NavLink} to="/" className="navbar-brand">
                {/* <img
                  className="img-fluid"
                  src={logo}
                  alt="logo"
                  style={{ width: '200px' }}
                /> */}
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
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    {user?.roleId && (
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
          </Container>
        </NavbarBs>
      </header>
    </>
  )
}

export default Navbar