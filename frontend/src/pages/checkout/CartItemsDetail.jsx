import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../utills/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { Toast } from "../../components/Toast";

export function CartItemsDetail({ cartitems, deliveryOptions, selectedDeliveryOption, loadCart }) {
    const [updated, setUpdated] = useState(false);
    const [quantity, setQuantity] = useState(cartitems.quantity);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const deleteCartItem = async () => {
        try {
            await axios.delete(`/api/cart-items/${cartitems.productId}`);
            await loadCart();
            setToast({ show: true, message: 'Item removed from cart', type: 'success' });
        } catch (error) {
            setToast({ show: true, message: 'Failed to delete item', type: 'error' });
        }
    }

    const updateQuantity = async () => {
        if (updated) {
            try {
                await axios.put(`/api/cart-items/${cartitems.productId}`, {
                    quantity: Number(quantity)
                });
                await loadCart();
                setUpdated(false);
                setToast({ show: true, message: 'Quantity updated successfully', type: 'success' });
            } catch (error) {
                setToast({ show: true, message: 'Failed to update quantity', type: 'error' });
            }
        } else {
            setUpdated(true);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateQuantity();
        } else if (event.key === 'Escape') {
            setQuantity(cartitems.quantity);
            setUpdated(false);
        }
    }

    const newQuantity = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <div className="cart-item-container">
            {toast.show && (
                <Toast 
                    message={toast.message} 
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })} 
                />
            )}
            <div className="delivery-date">
                Delivery date:
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
                <img className="product-image" src={cartitems.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">{cartitems.product.name}</div>
                    <div className="product-price">{formatMoney(cartitems.product.priceCents)}</div>
                    <div className="product-quantity">
                        <span>
                            Quantity:
                            <input className="quantity-input" input="number" min="1" max="15" value={quantity}
                                onKeyDown={handleKeyDown}
                                onChange={newQuantity}
                                disabled={!updated} />
                        </span>
                        <span className="update-quantity-link link-primary"
                            onClick={updateQuantity}>
                            {updated ? "Save" : "Update"}
                        </span>
                        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                            Delete
                        </span>
                    </div>
                </div>
                <DeliveryOptions cartitems={cartitems} deliveryOptions={deliveryOptions} loadCart={loadCart} />
            </div>
        </div>
    )
}