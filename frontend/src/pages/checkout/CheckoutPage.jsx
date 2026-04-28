import axios from 'axios';
import { useEffect, useState } from 'react';
import './CheckoutPage.css';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setdeliveryOptions] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

    useEffect(() => {
        const fetchCheckoutData = async () => {
            let response = await axios.get(`/api/delivery-options?expand=estimatedDeliveryTime`)
            setdeliveryOptions(response.data)
        }
        fetchCheckoutData();
    }, [])

    useEffect(() => {
        const fetchPaymentSummary = async () => {
            let response = await axios.get(`/api/payment-summary`)
            setPaymentSummary(response.data)
        }
        fetchPaymentSummary();
    }, [cart])

    return (
        <>
            <title>Checkout</title>
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                {cart.length > 0 ? (
                    <div className="checkout-grid">
                        <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                    </div>
                ) : (
                    <div className="empty-cart-message">
                        <p>Your cart is empty.</p>
                        <a href="/">Continue shopping</a>
                    </div>
                )}
            </div>
        </>
    )
}