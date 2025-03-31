import React, { useEffect, useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux';
import { caluculateOrderCost } from '../helpers/Helpers';
import toast from 'react-hot-toast';
import { useCreateNewOrderMutation } from '../../redux/api/oderApi';
import { useNavigate } from 'react-router-dom';

function PaymentMethods() {
    const navigate = useNavigate()

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)

    const [createNewOrder, { isLoading, error, isSuccess }] = useCreateNewOrderMutation()

    useEffect(() => {
        if(error) {
            toast.error(error?.data?.message)   
        }
        if(isSuccess) {
            toast.success("Order Created Successfully")
            navigate("/")
        }
    }, [error, isSuccess, navigate])

    const [method, setMethod] = useState("");
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!method) {
            toast.error("Please Select Payment Method");
            return;
        }
        
        // Validate zipCode exists in shippingInfo
        if (!shippingInfo?.
          postalCode
          ) {
            toast.error("Zip Code is required in shipping information");
            return;
        }
        
        const { itemPrice, shippingPrice, taxtPrice, totalPrice } = caluculateOrderCost(cartItems);
        
        // Prepare order items with required product field
        const preparedOrderItems = cartItems.map(item => ({
            ...item,
            product: item.product || item._id || item.productId // Ensure product field exists
        }));

        if (method === "COD") {
            const orderData = {
                shippingInfo,
                orderItems: preparedOrderItems,
                
                itemsPrice: itemPrice,
                taxAmount: taxtPrice,
                shippingAmount: shippingPrice,
                totalAmount: totalPrice,
                paymentInfo: {
                    status: "Not Paid",
                },
                paymentMethod: "COD",
            };
            
            createNewOrder(orderData);
        }
        
        if (method === "Card") {
            // Implementation for card payment
            toast.info("Card payment option coming soon!");
        }
    }
    

    return (
        <>
        <CheckoutSteps shipping confirmOrder payment/>
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submitHandler}
                >
                    <h2 className="mb-4">Select Payment Method</h2>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="payment_mode"
                            id="codradio"
                            value="COD"
                            onChange={() => setMethod("COD")}
                        />
                        <label className="form-check-label" htmlFor="codradio">
                            Cash on Delivery
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="payment_mode"
                            id="cardradio"
                            value="Card"
                            onChange={() => setMethod("Card")}
                        />
                        <label className="form-check-label" htmlFor="cardradio">
                            Card - VISA, MasterCard
                        </label>
                    </div>

                    <button 
                        id="shipping_btn" 
                        type="submit" 
                        className="btn py-2 w-100"
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "CONTINUE"}
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default PaymentMethods