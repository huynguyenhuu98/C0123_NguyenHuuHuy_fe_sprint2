import React from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import News from "../components/news/News"
import Shop from "../components/shops/Shop"
import Annocument from "../components/annocument/Annocument"

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <Shop shopItems={shopItems} addToCart={addToCart} />
      <TopCate />
      <News />
      <Annocument />
    </>
  )
}

export default Pages
