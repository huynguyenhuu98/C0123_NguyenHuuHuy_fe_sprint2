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
      <div>
          <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.2994392946507!2d108.18313267532413!3d16.0499438399536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142190be0dae881%3A0xcf2ebbbcbb2e92e7!2zMzkzIE5ndXnhu4VuIFBoxrDhu5tjIE5ndXnDqm4sIEFuIEtow6osIFRoYW5oIEtow6osIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1693291477745!5m2!1svi!2s"
    width="100%" height="250" style={{border:"0", marginBottom:"1rem"}} allowFullScreen="" loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"/>
      </div>
    </>
  )
}

export default Pages
