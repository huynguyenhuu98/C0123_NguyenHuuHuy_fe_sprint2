import React, {useState} from "react"
import {FormattedNumber} from "react-intl";
import {NavLink} from "react-router-dom";

const ShopCart = ({ shopItems,addToCart }) => {
  const [count, setCount] = useState(0)
  const[quantity,setQuantity]=useState(1)
  const role = localStorage.getItem('role');
  const increment = () => {
    setCount(count + 1)
  }

  return (
    <>
        {
        shopItems.length === 0 ? (
            <h4 style={{ color: "red", textAlign:"center" }}>Tên sản phẩm không tồn tại</h4>):
            shopItems.map((shopItems, index) => {

        return (

          <div className='box'>
            <div className='product mtop'>
              <div className='img'>
                {/*<span className='discount'>{shopItems.quantity}% Off</span>*/}
                <NavLink className="text-decoration-none" to={`detailProduct/${shopItems.id}`}>
                <img src={shopItems.images} alt='' height="500" width="500"/>
                </NavLink>
                <div className='product-like'>
                  <label>{count}</label> <br/>
                  <i className='fa-regular fa-heart' onClick={increment}></i>
                </div>
              </div>
              <div className='product-details'>
                <NavLink className="text-decoration-none text-black" to={`detailProduct/${shopItems.id}`}>
                <h3>{shopItems.nameRacing}</h3>
                </NavLink>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                </div>
                <div className='price'>
                  <h4>
                    <FormattedNumber
                        value={shopItems.price}  disabled
                        thousandSeparator={true} currency="VND"
                        minimumFractionDigits={0}
                    >
                    </FormattedNumber>&nbsp;<span>đ</span>
                    </h4>
                  {role === "ROLE_ADMIN"  ? '' :
                  <button onClick={() => addToCart(quantity,shopItems.id)}>
                    <i className='fa fa-plus'></i>
                  </button> }
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ShopCart
