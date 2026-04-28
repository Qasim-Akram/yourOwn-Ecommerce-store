import './CheckoutHeader.css';

export function CheckoutHeader() {
    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout 
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>
        </>
    )
}