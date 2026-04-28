import { formatMoney } from "../../utills/money"
import axios from "axios"
import { useNavigate } from "react-router"
import { Toast } from "../../components/Toast";
import { useState } from "react";

export function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate();
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isLoading, setIsLoading] = useState(false);

    const createOrder = async () => {
        try {
            setIsLoading(true);
            await axios.post(`/api/orders`);
            setIsLoading(false);
            setToast({ show: true, message: 'Your order is placed successfully!', type: 'success' });
            setTimeout(async () => {
                await loadCart();
                navigate(`/orders`);
            }, 2000);

        }
        catch (error) {
            console.error("Error placing order:", error);
            setToast({ show: true, message: 'Failed to place order. Please try again.', type: 'error' });
            setIsLoading(false);
        }
    }

    return (
        <>
            {toast.show && (
                <Toast className="toast"
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}

            <div className="payment-summary">
                <div className="payment-summary-title">
                    Payment Summary
                </div>
                {paymentSummary && (
                    <>
                        <div className="payment-summary-row">
                            <div>Items ({paymentSummary.totalItems}):</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                        </div>

                        <button
                            className="place-order-button button-primary"
                            onClick={createOrder}
                            disabled={isLoading}>
                            {isLoading ? 'Placing order...' : 'Place your order'}
                        </button>
                    </>
                )}
            </div>
        </>
    )
}