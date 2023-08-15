import React, {useState} from "react"
import {Link} from "react-router-dom"
import Categories from "../../components/MainPage/Categories";

const Navbar = () => {
    // Toogle Menu
    const [MobileMenu, setMobileMenu] = useState(false)
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
            <header className='header'>
                <div className='container d_flex'>
                    <div className='catgrories d_flex'>
                        <span class='fa-solid fa-border-all' style={{fontSize:"25px"}}></span>
                        <div className="dropdown" style={{backgroundColor:"white"}}>
                            <button className="dropdown-toggle box-background--white" type="button" data-bs-toggle="dropdown">
                                <span style={{backgroundColor:"white" ,fontSize:"24px"}}>
                                    Danh mục sản phẩm
                                </span>
                            </button>
                            <ul className="dropdown-menu">
                                {/*<li><a className="dropdown-item" href="#">Action</a></li>*/}
                                {/*<li><a className="dropdown-item" href="#">Another action</a></li>*/}
                                {/*<li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                                <div className='category'>
                                    {data.map((value, index) => {
                                        return (
                                            <div className='box ' key={index}>
                                                <img src={value.cateImg} alt=''/>
                                                <span>{value.cateName}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </ul>
                        </div>


                    </div>

                    <div className='navlink'>
                        <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"}
                            onClick={() => setMobileMenu(false)}>
                            <li>
                                <Link className="text-decoration-none text-black" to='/'>Trang chủ </Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none text-black" to='/favourite'>Sản phẩm yêu
                                    thích</Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none text-black" to='/delivery'>Giao hàng</Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none text-black" to='/instruct'>Hướng dẫn</Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none text-black" to='/advise'>Tư vấn</Link>
                            </li>
                            <li>
                                <Link className="text-decoration-none text-black" to='/contact'>Liên hệ</Link>
                            </li>
                        </ul>

                        <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
                            {MobileMenu ? <i className='fas fa-times close home-btn'></i> :
                                <i className='fas fa-bars open'></i>}
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
