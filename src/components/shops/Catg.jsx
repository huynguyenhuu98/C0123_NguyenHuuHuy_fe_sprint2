import React from "react"

const Catg = () => {
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Redleo",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Uma Racing",
    },
    {
      cateImg: "./images/category/cat-3.png",
      cateName: "Racing Boy",
    },
    {
      cateImg: "./images/category/cat-4.png",
      cateName: "Ohlins",
    },
    {
      cateImg: "./images/category/cat-5.png",
      cateName: "Nitron",
    },
    {
      cateImg: "./images/category/cat-6.png",
      cateName: "Brembo",
    },
  ]
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Brands </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex ' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
        {/*<div className='box box2'>*/}
        {/*  <button>View All Brands</button>*/}
        {/*</div>*/}
      </div>
    </>
  )
}

export default Catg
