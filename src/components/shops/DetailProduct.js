import * as serviceProduct from "../../service/ServiceProduct";
import * as shoppingCartService from "../../service/ShoppingCartService";
import React, {useEffect, useState} from "react";
import "./style.css"
import {useParams} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "react-slick";
import {FormattedNumber} from "react-intl";
import {useDispatch} from "react-redux";
import {getAllCart} from "../redux/action/cart";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

export function DetailProduct() {
    const param = useParams()
    const [productDetail, setProductDetail] = useState([])
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const nav = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const findDetailProduct = async () => {
        const result = await serviceProduct.detailProduct(param.id)
        setProductDetail(result)
    }
    const findAllListProduct = async () => {
        const result = await serviceProduct.findAllProductDetail()
        setProduct(result.content)
    }
    // thêm vào giỏ hàng
    const addCart = async () => {
        try {
            if (token == null) {
                await Swal.fire({
                    icon: "warning",
                    text: "Bạn phải đăng nhập mới có thể thêm vào giỏ hàng",
                })
                nav("/login")
            } else {
                await shoppingCartService.addShoppingCart(quantity, productDetail.id);
                await dispatch(getAllCart())
                await nav("/cart")
                await toast.success('Thêm vào giỏ hàng thành công')
            }
        } catch (e) {
            await nav("/cart")
            return toast.error(e.response.data)
        }

    }
    const onClickQuantity = async (value) => {
        if (value === 1) {
            if (quantity < productDetail.quantity) {
                setQuantity(quantity + 1)
            }
        } else {
            if (quantity > 1)
                setQuantity(quantity - 1)
        }
    }
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
    }
    useEffect(() => {
        findAllListProduct();
    }, [])
    useEffect(() => {
        findDetailProduct()
    }, [param.id])
    useEffect(() => {
        document.title = "Chi tiết sản phẩm "; // Thay đổi title
        window.scrollTo(0, 0)
    }, []);
    if (!productDetail) {
        return null
    }

    return (
        <>
            <div className="pd-wrap">
                <div className="container">
                    <div className="heading-section">
                        <h2>Chi tiết sản phẩm</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12 col-xs-12 ">
                            <div style={{width: "271px", marginLeft:"6rem"}} >
                                <img width="100%" height="100%" src={productDetail.images} alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="product-dtl">
                                <div className="product-info">
                                    <div className="product-name">{productDetail.nameRacing}</div>
                                    <div className="reviews-counter">
                                        <div className="rate" style={{float: "left"}}>
                                            <input type="radio" id="star5" name="rate" value="5"
                                                   checked/>
                                            <label htmlFor="star5" title="text">5 stars</label>
                                            {/*<input type="radio" id="star4" name="rate" value="4"*/}
                                            {/*       checked/>*/}
                                            <label htmlFor="star4" title="text">4 stars</label>
                                            {/*<input type="radio" id="star3" name="rate" value="3"*/}
                                            {/*       checked/>*/}
                                            <label htmlFor="star3" title="text">3 stars</label>
                                            {/*<input type="radio" id="star2" name="rate" value="2"/>*/}
                                            <label htmlFor="star2" title="text">2 stars</label>
                                            {/*<input type="radio" id="star1" name="rate" value="1"/>*/}
                                            <label htmlFor="star1" title="text">1 star</label>
                                        </div>
                                        <span> 3 Reviews</span>
                                    </div>
                                    <div className="product-price-discount"><FormattedNumber
                                        value={productDetail.price}  disabled
                                        thousandSeparator={true} currency="VND"
                                        minimumFractionDigits={0}
                                    >
                                    </FormattedNumber>&nbsp;<span>đ</span>
                                        {/*<span*/}
                                        {/*className="line-through">$29.00</span>*/}
                                    </div>
                                </div>
                                <p>({productDetail.quantity})</p>

                                <div className="product-count">
                                    <label htmlFor="size">Số lượng</label>
                                    <div className="display-flex">
                                        <button className="qtyminus" onClick={()=>onClickQuantity(0)}>-</button>
                                        <input type="text" name="quantity" min={1} value={quantity} className="qty"/>
                                        <button className="qtyplus" onClick={()=>onClickQuantity(1)}>+</button>
                                    </div>
                                    {
                                        productDetail.quantity == 0 ?
                                            <button className="round-red-btn " >Hết hàng</button> :
                                            <button className="round-black-btn" onClick={() => addCart()}>Thêm vào giỏ hàng</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-info-tabs">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="description-tab" data-toggle="tab"
                                   href="#description" role="tab" aria-controls="description"
                                   aria-selected="true">Mô tả</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="review-tab" data-toggle="tab" href="#review"
                                   role="tab" aria-controls="review" aria-selected="false">Reviews
                                    (0)</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="description" role="tabpanel"
                                 aria-labelledby="description-tab">
                                {productDetail.note}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/*Cac san pham tuong tu*/}

            <Slider {...settings}>
                {product.map((value, index) => {
                    return (
                        <>
                            <div className='box product' key={index}>
                                 <a className="text-decoration-none" href={`/detailProduct/${value.id}`}>    <div className='img'>
                                        <img src={value.images} alt='' width='100%'/>
                                    </div>
                                     <div style={{height:"3rem"}}>
                                         <h6 className="text-black" style={{marginTop: "6px"}}>{value.nameRacing}</h6>
                                     </div>
                                </a>
                                <div className='price'>
                                    <h5>
                                        <FormattedNumber
                                            value={value.price}  disabled
                                            thousandSeparator={true} currency="VND"
                                            minimumFractionDigits={0}
                                        >
                                        </FormattedNumber>&nbsp;<span>đ</span>
                                    </h5>
                                    <button >
                                        <i className='fa fa-plus'></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </Slider>
        </>
    )
}