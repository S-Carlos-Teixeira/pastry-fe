import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { baseUrl } from './config'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignUpLogin from './components/SignupLogin'
import { IUser } from './interfaces/user'
import CreateProduct from './components/CreateProduct'
import ShowProduct from './components/ShowProduct'
import Cart from './components/Cart'
import { ICart } from './interfaces/cart'
import Footer from './components/Footer'
// import Order from "./components/Order"

function App() {
  const [user, setUser] = useState<null | IUser>(null)
  const [show, setShow] = useState(false)
  const [cart, setCart] = useState<null | ICart>(null)

  async function fetchUser() {
    const token = localStorage.getItem('token')

    const { data } = await axios.get(`${baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(data)

    setUser(data)
    fetchCart()

  }
  async function fetchCart() {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${baseUrl}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setCart(data)
    console.log(cart)
  }

  useEffect(() => {
    localStorage.removeItem('token')
    setUser(null)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
  }, [])

  useEffect(() => {
    fetchCart()
  }, [user])
  return (
    <>
      <main>
        <Router>
          <Navbar
            user={user}
            setUser={setUser}
            show={show}
            setShow={setShow}
            cart={cart}
            setCart={setCart}
          />

          <Routes>
            <Route
              path="/"
              element={<Home fetchCart={fetchCart} cart={cart} />}
            />
            <Route
              path="/login"
              element={<SignUpLogin fetchUser={fetchUser} />}
            />
            <Route
              path="/product/:productId"
              element={
                <ShowProduct user={user} fecthCart={fetchCart} cart={cart} />
              }
            />
            <Route path="/addproduct" element={<CreateProduct user={user} />} />
            {/* <Route path="/order" element={<Order />}/> */}
          </Routes>
        </Router>
        {<Cart show={show} setShow={setShow} cart={cart} />}
      </main>
      {<Footer />}
    </>
  )
}

export default App
