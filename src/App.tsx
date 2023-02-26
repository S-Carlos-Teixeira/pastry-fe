import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { baseUrl } from './config'
import Home from './components/Home'
import Navbar from "./components/Navbar"
import SignUpLogin from "./components/SignupLogin"
import { IUser } from './interfaces/user'
import CreateProduct from "./components/CreateProduct"
import ShowProduct from "./components/ShowProduct"
import Cart from "./components/Cart"
import { ICartItem } from './interfaces/cartItem'
// import Order from "./components/Order"

function App() {
  const [user, setUser] = useState<null | IUser>(null)
  const [show, setShow] = useState(false)
  const [cartItems, setCartItems] = useState<Array<Partial<ICartItem>>>([])

  async function fetchUser() {
    const token = localStorage.getItem('token')
    
    const { data } = await axios.get(`${baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(data)

    setUser(data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
  }, [])
  return (
    
      <Router>
        
        <Navbar user={user} setUser={setUser} show={show} setShow={setShow} />
        <Container fluid={true} className='mb-4 container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignUpLogin fetchUser={fetchUser} />} />
            <Route path="/product/:productId" element={<ShowProduct user={user}/>} />
            <Route path="/addproduct" element={<CreateProduct user={user} />} />
            <Route path="/cart" element={ <Cart show={show} setShow={setShow}  />}/>
            {/* <Route path="/order" element={<Order />}/> */}
          </Routes>
        </Container>
      </Router>
    
  )
}

export default App
