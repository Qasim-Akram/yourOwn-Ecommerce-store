import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemsDetail } from "./CartItemsDetail";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartitems) => {
                const selectedDeliveryOption = deliveryOptions
                    .find((option) => option.id == cartitems.deliveryOptionId)

                return (
                    <CartItemsDetail
                        key={cartitems.id}
                        cartitems={cartitems}
                        deliveryOptions={deliveryOptions}
                        selectedDeliveryOption={selectedDeliveryOption}
                        loadCart={loadCart}
                    />
                )
            })}
        </div>
    )
}