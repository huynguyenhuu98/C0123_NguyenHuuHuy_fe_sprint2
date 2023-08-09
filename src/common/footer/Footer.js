import React from "react"
import "./style.css"

export function Footer() {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <h1>Elsu Racing</h1>
            <p>chuyên bán Phụ tùng xe máy, Phụ kiện, Đồ chơi xe máy Đà Nẵng, giao hàng trên toàn quốc khắp 63 tỉnh thành.</p>
            <div className='icon d_flex'>
              <div className='img d_flex'>
                <i class='fa-brands fa-google-play'></i>
                <span>Google Play</span>
              </div>
              <div className='img d_flex'>
                <i class='fa-brands fa-app-store-ios'></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div className='box'>
            <h2>Giới thiệu</h2>
            <ul>
              <li>Cửa hàng</li>
              <li>Giúp đỡ</li>
              <li>Hợp tác</li>
              <li>Câu hỏi thường gặp</li>
              <li>Điều khoản & Điều </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Hỗ trợ khách hàng</h2>
            <ul>
              <li>Hướng dẫn thanh toán </li>
              <li>Hướng dẫn mua hàng </li>
              <li>Phương thức vận chuyển </li>
              <li>Chính sách bảo mật </li>
              <li>Bảo hành & Hoàn trả </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Liên hệ chúng tôi</h2>
            <ul>
              <li>393 Nguyễn Phước Nguyên, Thanh Khê, Đà Nẵng</li>
              <li>Email: elsuracing@gmail.com</li>
              <li>Phone: (+84)835 443 443</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}