import axios from 'axios';
import { HomePage } from './pages/home/Homepage'
import { Routes, Route, Navigate } from 'react-router'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { Login } from './pages/account/Login'
import { Signup } from './pages/account/Signup'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'
import { useEffect, useState } from 'react'

function AppRoutes() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    } catch {
      // If 401, ProtectedRoute will handle redirect
      setCart([]);
    }
  }

  useEffect(() => {
    loadCart();
  }, [])

  return (
    <Routes>
      {/* Public routes */}
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes — redirect to /login if not authenticated */}
      <Route path='/homepage' element={
        <ProtectedRoute>
          <HomePage cart={cart} loadCart={loadCart} />
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage cart={cart} loadCart={loadCart} />
        </ProtectedRoute>
      } />
      <Route path="/orders" element={
        <ProtectedRoute>
          <OrdersPage cart={cart} loadCart={loadCart} />
        </ProtectedRoute>
      } />
      <Route path="/tracking/:orderId/:productId" element={
        <ProtectedRoute>
          <TrackingPage cart={cart} />
        </ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App