import axios from 'axios';
import { HomePage } from './pages/home/Homepage'
import { Routes, Route } from 'react-router'
import { CheckoutPage } from './pages/checkout/checkoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    }

  useEffect(() => {    
    loadCart();
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
        <Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart}/>} />
        <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>} />

      </Routes>
    </>
  )
}

export default App
