import React from "react"
import Dcard from "./Dcard"

const News = () => {
  return (
    <>
      <section className='Discount background NewArrivals'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              {/*<img src='https://img.icons8.com/windows/32/fa314a/gift.png' />*/}
              <img src='https://img.icons8.com/glyph-neue/64/26e07f/new.png' />
              <h2>News</h2>
            </div>
            <div className='heading-right row '>
              <span>Xem thêm</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <Dcard />
        </div>
      </section>
    </>
  )
}

export default News
