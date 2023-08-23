import React, {useEffect, useState} from "react";
import * as shoppingCartService from "../../service/ShoppingCartService"
import * as ordersAndOrderDetail from '../../service/OrderAndOrderDetail'
import {useDispatch} from "react-redux";
import {getAllCart} from "../../components/redux/action/cart";
import {FormattedNumber} from "react-intl";
import {PayPalButton} from "react-paypal-button-v2";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import "./style.css"

const Cart1 = ({CartItem}) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [cart, setCart] = useState([])
    const role = localStorage.getItem('role');
    const dispatch = useDispatch();
    const dollar = Math.floor(totalPrice / 23500);
    // sổ list và tính tổng tiền của sản phẩm
    const getAll = async () => {
        try {
            const res = await shoppingCartService.listShoppingCart();
            setCart(res)
            setTotalPrice(0)
            if (res != null) {
                {
                    await res.map(async (list) => (
                        await setTotalPrice((prevState) => (prevState + list.productRacing.price * list.quantity))
                    ))
                }
            }
        } catch (e) {
        }
    }


    // chỉnh sửa quantity
    const setQuantity = async (value, id, quantity) => {

        if (quantity > 1 || value === 1) {
            await shoppingCartService.setQuantityShopping(value, id)
            await getAll()
        }

    }
    // xoá sản phẩm trong gio hàng
    const deleteShoppingCart = async (id) => {
        const res = await shoppingCartService.deleteShopping(id);
        await dispatch(getAllCart())
        await getAll()
        await result(res);
    }
    // xoá sản phẩm
    const result = async () => {
        await Swal.fire({
            icon: "success",
            timer: "1000",
            text: "Xoá sản phẩm thành công"
        })
    }
    const deleteShopping = async (id, name) => {
        await Swal.fire({
            icon: "warning",
            title: "Xác nhận xóa",
            html: `Bạn có muốn xoá sản phẩm <span style="color: red">${name}</span> mà bạn đã thêm voà giỏ hàng không?`,
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            reverseButtons: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                await deleteShoppingCart(id)
            }
        })
    }
    const save = async (shopping) => {
        await ordersAndOrderDetail.saveOrderAndOrderDetail(shopping)
        await dispatch(getAllCart())
        await getAll()
    }

    useEffect(() => {
        getAll()
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <section className='cart-items'>
                <div className='container d_flex'>
                    <div className='cart-details'>
                        {cart.length === 0 && <h1 className='no-items product'>Không có sản phẩm trong giỏ</h1>}
                        {cart.map((item) => {
                            const productQty = item.productRacing.price * item.quantity
                            return (
                                <div className='cart-list product d_flex' key={item.id}>
                                    <div className='img me-2'>
                                        <img src={item.productRacing.images} alt=''/>
                                    </div>
                                    <div className='cart-details'>
                                        <h3>{item.nameRacing}</h3>
                                        <h4>
                                            {item.productRacing.price} * {item.quantity}
                                            {/*<span>{productQty}</span>*/}
                                        </h4>
                                    </div>
                                    <div className='cart-items-function'>
                                        <div className='removeCart'>
                                            <button className='removeCart' onClick={() => deleteShopping(item?.id, item?.productRacing.nameRacing)}>
                                                <i className='fa-solid fa-xmark'></i>
                                            </button>
                                        </div>

                                        <div className='cartControl d_flex'>
                                            <button className='incCart' onClick={() => setQuantity(1, item.id, item.quantity)}>
                                                <i className='fa-solid fa-plus'></i>
                                            </button>
                                            <button className='desCart' onClick={() => setQuantity(0, item.id, item.quantity)}>
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
                        {cart.length===0 ? '':
                            <div>
                        <h2>Tóm tắt giỏ hàng</h2>
                        <div className=' d_flex'>
                            <h4>Tổng tiền hàng :</h4>
                            <h3>
                                <FormattedNumber
                                    value={totalPrice} disabled
                                    thousandSeparator={true} currency="VND"
                                    minimumFractionDigits={0}
                                >
                                </FormattedNumber>&nbsp;<span>đ</span>
                            </h3>
                        </div>
                          <div className=' d_flex'>
                            <h4>Giao hàng :</h4>
                            <h3>
                                <FormattedNumber
                                    value={30000} disabled
                                    thousandSeparator={true} currency="VND"
                                    minimumFractionDigits={0}
                                >
                                </FormattedNumber>&nbsp;<span>đ</span>
                            </h3>
                        </div>
                                <div className=' d_flex'>
                                    <h4>Tổng thanh toán :</h4>
                                    <h3>
                                        <FormattedNumber
                                            value={totalPrice+30000} disabled
                                            thousandSeparator={true} currency="VND"
                                            minimumFractionDigits={0}
                                        >
                                        </FormattedNumber>&nbsp;<span>đ</span>
                                    </h3>
                                </div>
                            </div>}


                        <div className="mt-3 mb-5">
                            {role === "ROLE_ADMIN" || cart.length === 0 ? '' :
                                <PayPalButton
                                    amount={dollar}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details, data) => {
                                        save()
                                        toast.success("Đã thanh toán thành công");
                                        // alert("Transaction completed by " + details.payer.name.given_name);

                                        // OPTIONAL: Call your server to save the transaction
                                        return fetch("/paypal-transaction-complete", {
                                            method: "post",
                                            body: JSON.stringify({
                                                orderID: data.orderID
                                            })
                                        });
                                    }}
                                />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Cart1