import React, {useState} from "react"
import logo1 from "../../components/assets/images/logo.png"
import {Link, useNavigate} from "react-router-dom"
import {Field, Form, Formik} from "formik";
import * as serviceProduct from "../../service/ServiceProduct"


const Search = ({ CartItem  }) => {
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  const [shopItems, setShopItems] = useState([])
  const nav = useNavigate();
  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo1} width="208px" height="68px" alt='' />
          </div>

          {/*<div className='search-box d_flex'>*/}
          {/*  <i className='fa fa-search'></i>*/}
          {/*  <input type='text' placeholder='Nhập tên sản phẩm muốn tìm...' />*/}
          {/*  <span className="d-flex justify-content-center">Tất cả</span>*/}
          {/*</div>*/}

          <Formik
              initialValues={{
                name: ''
              }}
              // onSubmit={(values) => {
              //   const findName = async () => {
              //     const result = await serviceProduct.findByNameProduct(values.name)
              //     nav("/", { state: { searchResults: result.content } });
              //   }
              //   findName()
              // }}
              onSubmit={async (values) => {
                try {
                  const result = await serviceProduct.findByNameProduct(values.name);
                  setShopItems(result.content); // Lưu kết quả tìm kiếm vào state
                  nav("/");
                } catch (error) {
                  console.error(error);
                }
              }}
          >{
            <Form className='search-box d_flex'>
              {/*<i className='fa fa-search'></i>*/}
              <Field type="text" name="name" placeholder='Nhập tên sản phẩm muốn tìm...'/>
              <button className="btn me-4" type="submit" style={{ width: '3rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                     className="bi bi-search" viewBox="0 0 16 16">
                  <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </Form>}
          </Formik>


          <div className='icon d_flex width'>
            <Link className="text-black" to='/login'>
              <i className='fa fa-user icon-circle'></i>
            </Link>
            <div className='cart'>
              <Link className="text-black" to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
