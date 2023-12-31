import React from "react"
import "./style.css"
import {PayPalButton} from "react-paypal-button-v2";
import {FormattedNumber} from "react-intl";

const Cart = ({CartItem, addToCart, decreaseQty}) => {
    // Stpe: 7   calucate total of items
    const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
    const dollar = Math.floor(totalPrice / 23500);
    return (
        <>
            <section className='cart-items'>
                <div className='container d_flex'>
                    <div className='cart-details'>
                        {CartItem.length === 0 && <h1 className='no-items product'>Không có sản phẩm trong giỏ</h1>}
                        {CartItem.map((item) => {
                            const productQty = item.price * item.qty

                            return (
                                <div className='cart-list product d_flex' key={item.id}>
                                    <div className='img'>
                                        <img src={item.images} alt=''/>
                                    </div>
                                    <div className='cart-details'>
                                        <h3>{item.nameRacing}</h3>
                                        <h4>
                                            {item.price} * {item.qty}
                                            <span>{productQty}</span>
                                        </h4>
                                    </div>
                                    <div className='cart-items-function'>
                                        <div className='removeCart'>
                                            <button className='removeCart'>
                                                <i className='fa-solid fa-xmark'></i>
                                            </button>
                                        </div>

                                        <div className='cartControl d_flex'>
                                            <button className='incCart' onClick={() => addToCart(item)}>
                                                <i className='fa-solid fa-plus'></i>
                                            </button>
                                            <button className='desCart' onClick={() => decreaseQty(item)}>
                                                <i className='fa-solid fa-minus'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='cart-item-price'></div>
                                </div>
                            )
                        })}
                    </div>

                    <div className='cart-total product'>
                        <h2>Tóm tắt giỏ hàng</h2>
                        <div className=' d_flex'>
                            <h4>Tổng thanh toán :</h4>
                            <h3>
                                <FormattedNumber
                                    value={totalPrice} disabled
                                    thousandSeparator={true} currency="VND"
                                    minimumFractionDigits={0}
                                >
                                </FormattedNumber>&nbsp;<span>đ</span>
                            </h3>
                        </div>
                        <div className="mt-5">
                            <PayPalButton
                                amount={dollar}
                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                onSuccess={(details, data) => {
                                    alert("Transaction completed by " + details.payer.name.given_name);

                                    // OPTIONAL: Call your server to save the transaction
                                    return fetch("/paypal-transaction-complete", {
                                        method: "post",
                                        body: JSON.stringify({
                                            orderID: data.orderID
                                        })
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
