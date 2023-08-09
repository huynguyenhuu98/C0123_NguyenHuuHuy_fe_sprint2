import React from "react"

const Annocument = () => {
  return (
    <>
      <section className='annocument background'>
        <div className='container d_flex'>
          <div className='img' style={{width: "30%", height: "340px"}}>
            <img src='./images/banner-1.png' width='100%' height='100%' />
          </div>
          <div className='img' style={{width: "68%", height: "340px"}}>
            <img src='./images/banner-2.png' width='100%' height='100%' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Annocument
