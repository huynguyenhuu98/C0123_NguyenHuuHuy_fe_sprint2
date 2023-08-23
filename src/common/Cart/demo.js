import '../../css/shoping_cart.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, {useContext, useEffect, useState} from "react";
import * as shoppingCart from "../../service/ShoppingCart"
import {FormattedNumber} from "react-intl";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {PayPalButton} from "react-paypal-button-v2";
import * as ordersAndOrderDetail from '../../service/OrderAndOrderDetail'
import {QuantityContext} from "../context/quantityContext";
import {useDispatch} from "react-redux";
import {getAllCart} from "../redux/actions/cart";

export function ShoppingCart() {
    const [totalPrice, setTotalPrice] = useState(0)
    const [cart, setCart] = useState([])
    const nav = useNavigate()
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();


    // sổ list và tính tổng tiền của sản phẩm
    const getAll = async () => {
        try {
            const res = await shoppingCart.listShoppingCart();
            setCart(res)
            setTotalPrice(0)

            if (res != null) {
                {
                    await res.map(async (list) => (
                        await setTotalPrice((prevState) => (prevState + list.productFruit.price * list.quantity))
                    ))
                }
            }
        } catch (e) {
        }
    }


    // chỉnh sửa quantity
    const setQuantity = async (value, id, quantity) => {

        if (quantity > 0 || value === 1) {
            await shoppingCart.setQuantityShopping(value, id)
            await getAll()
        }

    }
    //     // xoá sản phẩm trong gior hàng
    const deleteShoppingCart = async (id) => {
        const res = await shoppingCart.deleteShopping(id);
        await dispatch(getAllCart())
        await getAll()
        await result(res);
    }
    // xoá sản phẩm
    const result = async () => {
        await Swal.fire({
            icon: "success",
            timer: "2000",
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

            <nav
                className="breadcrumbs text-center h2 d-flex justify-content-center" style={{marginTop: "-0%"}}>
                <a href="" className="current" style={{color: "#03964c"}}> Giỏ hàng </a>
                <span>
                   <i className="fa-solid fa-angle-right"></i>
                </span>
                <a href="" className="current" style={{color: "#03964c"}}>&nbsp; Chi tiết đơn hàng </a>
                <span>
                   <i className="fa-solid fa-angle-right"></i>
                </span>
                <a href="" className="current" style={{color: "#03964c"}}>&nbsp; Đặt hàng thành công </a>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-7 mb-3 mt-3 ">
                        <div className="">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th colSpan="2">Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng(Kg)</th>
                                        <th>Tạm tính</th>
                                        <th>&ensp;</th>
                                    </tr>
                                    </thead>
                                    {cart.length == '' ?
                                        <tr>
                                            <td colSpan={4}>
                                                <div style={{marginLeft: "10%"}}><h2 className="text-center mt-4 mb-3"
                                                                                     style={{color: "red"}}>Giỏ hàng
                                                    trống rồi hãy đi mua
                                                    nào!</h2>
                                                    <Link to="/card" style={{marginLeft: "35%"}}>
                                                        <span className="btn btn-success">Quay lại trang sản phẩm</span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        :
                                        <tbody>

                                        {cart.map((list, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img className="pic"
                                                         src={list.productFruit.image}
                                                         alt=""/>
                                                </td>
                                                <td>{list.productFruit.nameFruit}</td>
                                                <td><FormattedNumber
                                                    value={list.productFruit.price}>
                                                    thousandSeparator={true} currency="VND"
                                                    minimumFractionDigits={0}
                                                </FormattedNumber> đ
                                                </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <button type="button"
                                                                onClick={() => setQuantity(0, list.id, list.quantity)}
                                                                className="minus" style={{borderRadius: "5px 0 0 5px"}}>

                                                            <span>-</span></button>
                                                        <input type="text"
                                                               className="input" step="1" min="0" max
                                                               value={list.quantity}
                                                        />
                                                        <button type="button" value="+"
                                                                onClick={() => setQuantity(1, list.id, list.quantity)}
                                                                className="plus" style={{borderRadius: " 0 5px 5px 0"}}>
                                                            <span>+</span>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <FormattedNumber
                                                        value={list.productFruit.price * list.quantity}>
                                                        thousandSeparator={true} currency="VND"
                                                        minimumFractionDigits={0}
                                                    </FormattedNumber> đ
                                                </td>
                                                <td>
                                                    <div
                                                        onClick={() => deleteShopping(list?.id, list?.productFruit.nameFruit)}
                                                        className="btn" data-bs-dismiss="alert">
                                                        <span className="fas fa-times"></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5 mt-3">
                        <div className="">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th colSpan="2">Cộng giỏ hàng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>Tạm tính</th>
                                        <td className="justify-content-end d-flex"><FormattedNumber
                                            value={totalPrice}>
                                            thousandSeparator={true} currency="VND"
                                            minimumFractionDigits={0}
                                        </FormattedNumber> đ
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giao hàng</th>
                                        <td className="justify-content-end d-flex">Giao hàng tận nơi</td>
                                    </tr>
                                    <tr>
                                        <th>Tổng tiền</th>
                                        <td style={{color: "red"}} className="justify-content-end d-flex">
                                            <FormattedNumber
                                                value={totalPrice}>
                                                thousandSeparator={true} currency="VND"
                                                minimumFractionDigits={0}
                                            </FormattedNumber> đ
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                {/*<button className="btn btn-success mb-3 " type="submit" style={{width: "100%"}}> Tiến*/}
                                {/*    hành*/}
                                {/*    thanh toán*/}
                                {/*</button>*/}
                                {role == "ADMIN" ? '' :
                                    <PayPalButton
                                        amount={Math.ceil(totalPrice / 23940)}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={(details, data) => {
                                            save()
                                            toast.success("Đã thanh toán thành công"
                                                // + details.payer.name.given_name
                                            );

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

                </div>
            </div>
        </>
    )
}