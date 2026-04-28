import './trackingpage.css'
import { useParams } from 'react-router'
import { Header } from '../components/Header'
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { formatMoney } from '../utills/money';

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        }
        getTrackingData();
    }, [orderId])

    if (!order) return null;

    const orderProduct = order.products.find(p => p.product.id === productId);

    if (!orderProduct) return null;

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    if (deliveryPercent > 100) deliveryPercent = 100;

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
            <title>Tracking</title>
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking-container">

                    <div className="tracking-header">
                        <div>
                            <span className="label">Order ID: </span>
                            <span>{order.id}</span>
                        </div>
                        <div>
                            <span className="label">Order Placed: </span>
                            <span>{dayjs(order.orderTimeMs).format('MMMM D')}</span>
                        </div>
                        <div>
                            <span className="label">Total: </span>
                            <span>{formatMoney(order.totalCostCents)}</span>
                        </div>
                    </div>

                    <div className="product-info">
                        <img
                            className="product-image"
                            src={orderProduct.product.image}
                            alt={orderProduct.product.name}
                        />
                        <div>
                            <div className="product-name">
                                {orderProduct.product.name}
                            </div>
                            <div className="product-quantity">
                                Quantity: {orderProduct.quantity}
                            </div>
                            <div className="delivery-date">
                                {deliveryPercent >= 100 ? 'Delivered on: ' : 'Arriving on: '}
                                {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                            </div>
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${deliveryPercent}%`,
                                '--progress': `${deliveryPercent}%`
                            }}
                        ></div>
                    </div>

                    <div className="progress-labels">
                        <div className={`progress-label ${isPreparing ? 'current-status' : ' Preparing'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped ? 'current-status' : ' Shipped'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered ? 'current-status' : ' Delivered'}`}>
                            Delivered
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}