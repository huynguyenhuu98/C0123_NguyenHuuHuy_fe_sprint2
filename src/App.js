import React, {useEffect, useState} from "react"
import "./App.css"
import {Routes, Route, useSearchParams} from "react-router-dom"
import * as shoppingCartService from "./service/ShoppingCartService"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/flashDeals/Data"
import Cart from "./common/Cart/Cart1"
import {Footer} from "./common/footer/Footer"
import {Login} from "./components/login/Login";
import * as serviceProduct from "./service/ServiceProduct"
import {DetailPosts} from "./components/news/DetailPosts";
import {DetailProduct} from "./components/shops/DetailProduct";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {getAllCart} from "./components/redux/action/cart";
import {useNavigate} from "react-router"
import {History} from "./components/history/History";
import {Delivery} from "./common/header/Delivery";
import {Instruct} from "./common/header/Instruct";
import {Introduce} from "./common/header/Introduce";

function App() {
    //Step 1 :
    const {productItems} = Data
    const [shopItems, setShopItems] = useState([])
    const [searchParam, setSearchParam] = useSearchParams()
    const [nameSearch,setNameSearch] = useState("")
    const dispatch = useDispatch();
    const token =localStorage.getItem('token');
    const nav = useNavigate();
    const findAllProduct = async (nameSearch) => {
        const result = await serviceProduct.findAllProductRacing(nameSearch||"")
        setShopItems(result.content)
    }
    useEffect(() => {
        if (searchParam) {
            setNameSearch(searchParam.get('nameSearch'));
        }
        findAllProduct(searchParam.get('nameSearch'));
        if(nameSearch===""){
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 1100);
        }
    }, [searchParam])

    //Step 2 :
    const [CartItem, setCartItem] = useState([])
    //Step 4 :
    // const addToCart = (product) => {
    //     const productExit = CartItem.find((item) => item.id === product.id)
    //     if (productExit) {
    //         setCartItem(CartItem.map((item) => (item.id === product.id ? {
    //             ...productExit,
    //             qty: productExit.qty + 1
    //         } : item)))
    //     } else {
    //         setCartItem([...CartItem, {...product, qty: 1}])
    //     }
    // }

    const addToCart = async (quantity, idProduct) => {
        try {
            if (token==null ){
                await Swal.fire({
                    icon:"warning",
                    text:"Bạn phải đăng nhập mới có thể thêm vào giỏ hàng",
                })
                nav("/login")
            }else {
                await shoppingCartService.addShoppingCart(quantity, idProduct)
                await dispatch(getAllCart())
                await toast.success("Thêm vào giỏ hàng thành công")
            }

        } catch (e) {
            return toast.error(e.response.data)
        }
    }

    // Stpe: 6
    const decreaseQty = (product) => {
        const productExit = CartItem.find((item) => item.id === product.id)
        if (productExit.qty === 1) {
            setCartItem(CartItem.filter((item) => item.id !== product.id))
        } else {
            setCartItem(CartItem.map((item) => (item.id === product.id ? {
                ...productExit,
                qty: productExit.qty - 1
            } : item)))
        }
    }
    return (
        <>
            <div>
                {/* Header chỉ hiển thị nếu đang không ở trang Login */}
                {!window.location.pathname.includes('/login') && <Header CartItem={CartItem} />}
                {/*<Header CartItem={CartItem}/>*/}
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
                    <Route path="/cart" element={<Cart CartItem={CartItem} addToCart={addToCart}
                        // decreaseQty={decreaseQty}
                    />} />
                    <Route path="/login" element={<Login />} />
                    <Route path={'/detailPosts/:id'} element={<DetailPosts/>}/>
                    <Route path={'/detailProduct/:id'} element={<DetailProduct/>}/>
                    <Route path={'/history'} element={<History/>}/>
                    <Route path={'/delivery'} element={<Delivery/>}/>
                    <Route path={'/instruct'} element={<Instruct/>}/>
                    <Route path={'/introduce'} element={<Introduce/>}/>
                </Routes>
            </div>
            <div>
                {/* Footer chỉ hiển thị nếu đang không ở trang Login */}
                {!window.location.pathname.includes('/login') && <Footer/>}
                {/*<Footer />*/}
            </div>
        </>
    )
}

export default App

