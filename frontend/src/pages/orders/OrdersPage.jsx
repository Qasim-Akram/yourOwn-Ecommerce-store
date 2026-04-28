import { formatMoney } from '../../utills/money';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { Header } from '../../components/Header';
import './orderspage.css'
import dayjs from 'dayjs';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrderData = async () => {
            const response = await axios.get(`/api/orders?expand=products`)
            setOrders(response.data)
        }
        getOrderData();
    }, [])

    return (
        <>
            <title>Orders</title>
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return (
                            <>
                                <div key={order.id} className="order-container">

                                    <div className="order-header">
                                        <div className="order-header-left-section">
                                            <div className="order-date">
                                                <div className="order-header-label">Order Placed:</div>
                                                <div>{dayjs(order.orderTimeMs).format(' MMMM D')}</div>
                                            </div>
                                            <div className="order-total">
                                                <div className="order-header-label">Total:</div>
                                                <div>{formatMoney(order.totalCostCents)}</div>
                                            </div>
                                        </div>

                                        <div className="order-header-right-section">
                                            <div className="order-header-label">Order ID:</div>
                                            <div>{order.id}</div>
                                        </div>
                                    </div>

                                    <div className="order-details-grid">
                                        {order.products.map((orderProduct) => {
                                            const addToCart = async () => {
                                                await axios.post(`/api/cart-items`, {
                                                    productId: orderProduct.product.id,
                                                    quantity: 1
                                                })
                                                await loadCart();
                                            }

                                            return (
                                                <Fragment key={orderProduct.id}>
                                                    <div className="product-image-container">
                                                        <img src={orderProduct.product.image} />
                                                    </div>

                                                    <div className="product-details">
                                                        <div className="product-name">
                                                            {orderProduct.product.name}
                                                        </div>
                                                        <div className="product-delivery-date">
                                                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format(`MMMM D`)}
                                                        </div>
                                                        <div className="product-quantity">
                                                            Quantity: {orderProduct.quantity}
                                                        </div>
                                                        <button className="buy-again-button button-primary" onClick={addToCart}>
                                                            <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                            <span className="buy-again-message">Add to Cart</span>
                                                        </button>
                                                    </div>

                                                    <div className="product-actions">
                                                        <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                                                            <button className="track-package-button button-secondary">
                                                                Track package
                                                            </button>
                                                        </a>
                                                    </div>


                                                </Fragment>)
                                        }
                                        )
                                        }


                                    </div>
                                </div>
                            </>
                        )
                    })}

                </div>
            </div>

        </>)
}