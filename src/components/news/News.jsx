import React from "react"
import Dcard from "./Dcard"

const News = () => {
  return (
    <>
      <section className='Discount background NewArrivals'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left  f_flex'>
              {/*<img src='https://img.icons8.com/windows/32/fa314a/gift.png' />*/}
              <img src='https://img.icons8.com/glyph-neue/64/26e07f/new.png' />
              <h3 style={{margin:"5px"}}>News</h3>
            </div>
            {/*<div className='heading-right '>*/}
            {/*  <span>Xem thêm</span>*/}
            {/*  <i className='fa-solid fa-caret-right'></i>*/}
            {/*</div>*/}
          </div>
          <Dcard />
        </div>
      </section>
    </>
  )
}

export default News
