import React from "react"
import "./style.css"
import TopCart from "./TopCart"

const TopCate = () => {
  return (
    <>
      <section className='TopCate background'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left f_flex'>
              <i className='fa-solid fa-border-all'></i>
              <h3 style={{margin:"10px 0px"}}>Các mẫu xe kiểng</h3>
            </div>
            <div className='heading-right '>
              <span>View all</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <TopCart />
        </div>
      </section>
    </>
  )
}

export default TopCate
