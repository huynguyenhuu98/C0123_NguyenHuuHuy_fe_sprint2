import React, {useEffect, useState} from "react"
import "./App.css"
import {Routes, Route} from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/flashDeals/Data"
import Cart from "./common/Cart/Cart"
import {Footer} from "./common/footer/Footer"
import {Login} from "./components/login/Login";
import * as serviceProduct from "./service/ServiceProduct"
import {DetailPosts} from "./components/news/DetailPosts";

function App() {
    //Step 1 :
    const {productItems} = Data
    const [shopItems, setShopItems] = useState([])
    const findAllProduct = async () => {
        const result = await serviceProduct.findAllProductRacing()
        setShopItems(result.content)
    }
    useEffect(() => {
        findAllProduct()
    }, [])
    //Step 2 :
    const [CartItem, setCartItem] = useState([])
    //Step 4 :
    const addToCart = (product) => {
        const productExit = CartItem.find((item) => item.id === product.id)
        if (productExit) {
            setCartItem(CartItem.map((item) => (item.id === product.id ? {
                ...productExit,
                qty: productExit.qty + 1
            } : item)))
        } else {
            setCartItem([...CartItem, {...product, qty: 1}])
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
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
                    <Route path="/cart" element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path={'/detail/:id'} element={<DetailPosts/>}/>
                </Routes>
            </div>
            <div>
                {/* Footer chỉ hiển thị nếu đang không ở trang Login */}
                {!window.location.pathname.includes('/login') && <Footer />}
            </div>
        </>
    )
}

export default App

