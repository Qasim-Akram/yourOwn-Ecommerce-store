import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function Header({ cart }) {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    let totalItems = 0;
    cart.forEach((item) => {
        totalItems += item.quantity;
    });

    const searchItem = () => {
        navigate(`/homepage?search=${searchTerm}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchItem();
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/homepage" className="header-link brand-link">
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
                    {user && (
                        <span className="user-greeting">
                            Hi, {user.firstName}
                        </span>
                    )}
                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>
                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="cart" />
                        {totalItems > 0 && <div className="cart-quantity">{totalItems}</div>}
                        <div className="cart-text">Cart</div>
                    </Link>
                    <div className="nav-divider" />
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}