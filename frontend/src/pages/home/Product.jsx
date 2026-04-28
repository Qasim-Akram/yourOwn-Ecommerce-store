import './Homepage.css'
import { formatMoney } from "../../utills/money"
import axios from "axios";
import { useState } from "react";

export function Product({ product, loadCart }) {
    const [quantity, setquantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity: quantity
        });
        await loadCart();

        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
        }, 2000)
    }

    const selectQuantity = (e) => {
        const selectedQuantity = Number(e.target.value);
        setquantity(selectedQuantity);
    }


    return (
        <div className="product-container"
            data-testId="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    data-testid="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    data-testid="
                    product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity} className="quantity-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: addedToCart ? 1 : 0 }}>
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                data-testid='add-to-cart-button'
                onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    )
}