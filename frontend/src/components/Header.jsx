import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';
import { useState } from 'react';

export function Header({ cart }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    let totalItems = 0;
    cart.forEach((item) => {
        totalItems += item.quantity;
    });

    const searchItem = () => {
        navigate(`/?search=${searchTerm}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchItem();
        }
    };

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="header-link brand-link">
                        <span className="brand-name">yourOwn</span>
                        <span className="brand-tagline">Everything You. Nothing Less.</span>
                    </Link>
                </div>

                <div className="middle-section">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={searchItem}>
                        <img className="search-icon" src="images/icons/search-icon.png" alt="search" />
                    </button>
                </div>

                <div className="right-section">
                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>
                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="cart" />
                        {totalItems && <div className="cart-quantity">{totalItems}</div>}
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>
        </>
    );
}