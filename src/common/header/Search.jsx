import React, {useEffect, useState} from "react"
import logo1 from "../../components/assets/images/logo.png"
import {Link, NavLink} from "react-router-dom"
import {useNavigate} from "react-router"
import {Field, Form, Formik} from "formik";
import * as serviceProduct from "../../service/ServiceProduct"
import {Dropdown, Image} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

const Search = ({CartItem}) => {
    window.addEventListener("scroll", function () {
        const search = document.querySelector(".search")
        search.classList.toggle("active", window.scrollY > 100)
    })
    const [shopItems, setShopItems] = useState([])
    const [isLogin, setIsLogin] = useState();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const currentUserName = localStorage.getItem('username');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const iconQuantity = useSelector(state => state.cart)
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

//     useEffect(() => {
//         if (token) {
//             setIsLogin(true);
//         } else {
// // Xử lý khi không có token trong localStorage
//         }
//     }, [token])
    useEffect(() => {
        if (token) {
            setIsLogin(true)
            // setUserName(currentUserName)
        } else {
// Xử lý khi không có token trong localStorage
        }
    }, [token])
    const handlerLogout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
        setIsLogin(false)
        toast.success("Đăng xuất thành công")
        navigate("/")
    }
    return (
        <>
            <section className='search'>
                <div className='container c_flex'>
                    <div className='logo width '>
                        <img src={logo1} width="208px" height="68px" alt=''/>
                    </div>
                    <Formik
                        initialValues={{
                            name: ''
                        }}
                        onSubmit={(values) => {
                            const result = async () => {
                                navigate("/?nameSearch="+values.name)
                            }
                            result();
                        }}
                    >{
                        <Form className='search-box d_flex'>
                            {/*<i className='fa fa-search'></i>*/}
                            <Field type="text" name="name" placeholder='Nhập tên sản phẩm muốn tìm...'/>
                            <button className="btn me-4" type="submit" style={{width: '3rem'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                        </Form>}
                    </Formik>

                    <div className='icon d_flex width'>
                        {/*<Link className="text-black" to='/login'>*/}
                        {/*    <i className='fa fa-user icon-circle'></i>*/}
                        {/*</Link>*/}
                        {isLogin ? (
                                <>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle
                                            style={{backgroundColor: "#fefefe"}}
                                            className="nav-link text-black">
                                            <i className='fa fa-user icon-circle'></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="abc">
                                            <Link className="dropdown-item " style={{color: "black"}}>
                                                <span>  {currentUserName} <i className="fa-solid fa-user"></i></span>
                                            </Link>
                                            {role !== 'ROLE_ADMIN' ?
                                                ''
                                                : <Link to="/homeAdmin" className="dropdown-item "
                                                style={{color: "black"}}>Quản lý cửa hàng <i
                                                className="fa-solid fa-list-check"></i></Link>
                                            }
                                            {role !== 'ROLE_ADMIN' ?
                                                ''
                                                :  <Link to="/history" className="dropdown-item "
                                                style={{color: "black"}}>Lịch sử thanh toán <i
                                                className="fa-solid fa-list-check"></i></Link>
                                            }
                                            <Link className="dropdown-item " onClick={() => handlerLogout()}
                                                  style={{color: "black"}}>Đăng xuất <i
                                                className="fa-solid fa-right-from-bracket"></i></Link>
                                        </DropdownMenu>
                                    </Dropdown>
                                </>
                            )
                            :
                            <NavLink className="text-black" to='/login'>
                                <i className='fa fa-user icon-circle'></i>
                            </NavLink>
                        }
                        <div className='cart'>
                            <Link className="text-black" to='/cart'>
                                <i className='fa fa-shopping-bag icon-circle'></i>
                                <span><sup className="align-items-lg-center">({iconQuantity})</sup></span>
                                {/*<span>{CartItem.length === 0 ? "" : CartItem.length}</span>*/}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </>
    )
}

export default Search
