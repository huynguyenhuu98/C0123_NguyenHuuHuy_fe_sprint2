import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left'>
            <i className='fa fa-phone'/>
            <label> (+84)835 443 443 </label>
            <i className='fa fa-envelope ms-2'/>
            <label> elsuracing@gmail.com</label>
          </div>
          <div className='right RText'>
            <label>Câu hỏi thường gặp</label>
            <label>Giúp đỡ?</label>
            <span>🇻🇳  </span>
            <label>VN</label>
            <span>🇺🇸‍️  </span>
            <label>EN</label>
          </div>
        </div>
        <marquee behavior="scroll" direction="right" scrollamount="7" style={{color: "red", marginTop:"3px",fontStyle:"italic" }}> 🛵 Chào mừng bạn đến với trang
        Elsu Racing chuyên bán các loại đồ chơi xe 🏍 Liên hệ hotline 📲 0️⃣8️⃣3️⃣5️⃣4️⃣4️⃣3️⃣4️⃣4️⃣3️⃣ </marquee>
      </section>
    </>
  )
}

export default Head
