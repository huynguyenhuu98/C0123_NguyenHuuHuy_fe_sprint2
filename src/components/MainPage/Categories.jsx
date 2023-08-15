import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/phuot.png",
      cateName: "Phuột - thắng",
    },
    {
      cateImg: "./images/category/lopxe.png",
      cateName: "Lốp xe",
    },
    {
      cateImg: "./images/category/kinhgu.png",
      cateName: "Kính - gù",
    },
    {
      cateImg: "./images/category/denled.png",
      cateName: "Đèn led",
    },
    {
      cateImg: "./images/category/nhotxe.png",
      cateName: "Nhớt xe máy",
    },
    {
      cateImg: "./images/category/phutung.png",
      cateName: "Phụ tùng thay thế",
    },
    {
      cateImg: "./images/category/phukienbiker.png",
      cateName: "Phụ kiện biker",
    }
  ]

  return (
    <>
      {/*<div className='category'>*/}
      {/*  {data.map((value, index) => {*/}
      {/*    return (*/}
      {/*      <div className='box f_flex' key={index}>*/}
      {/*        <img src={value.cateImg} alt='' />*/}
      {/*        <span>{value.cateName}</span>*/}
      {/*      </div>*/}
      {/*    )*/}
      {/*  })}*/}
      {/*</div>*/}
    </>
  )
}

export default Categories
