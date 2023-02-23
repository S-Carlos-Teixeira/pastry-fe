import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { baseUrl } from './config'
import Home from './components/Home'
import Navbar from "./components/Navbar"
// import Signup from "./components/Signup"
// import Login from "./components/Login"
import { IUser } from './interfaces/user'
// import AddProduct from "./components/AddProduct"
// import ShowProduct from "./components/ShowProduct"
// import Payment from "./components/Payment"
// import Address from "./components/Address"
// import SellerSignup from "./components/SellerSignup"
// import Cart from "./components/Cart"
// import Order from "./components/Order"

function App() {
  const [user, setUser] = useState<null | IUser>(null)

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
        <Navbar user={user} setUser={setUser} />
        <main className='mb-4 container'>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            {/* <Route path="/login" element={<Login fetchUser={fetchUser} />} /> */}
            {/* <Route path="/product/:productId" element={<ShowProduct user={user} setUser={setUser}/>} /> */}
            {/* <Route path="/addproduct" element={<AddProduct />} /> */}
            {/* <Route path="/seller/signup" element={<SellerSignup />} /> */}
            {/* <Route path="/cart" element={<Cart />}/> */}
            {/* <Route path="/order" element={<Order />}/> */}
            {/* <Route path="/address" element={<Address />} /> */}
            {/* <Route path="/payment" element={<Payment />} /> */}
          </Routes>
        </main>
      </Router>
    
  )
}

export default App
