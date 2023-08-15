import React, {useEffect, useState} from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import moment from "moment";
import "./style.css"
import * as servicePosts from "../../service/PostsService";
import {NavLink} from "react-router-dom";

const Dcard = () => {
  const [posts, setPosts] = useState([])
  const findAllPosts = async () => {
    const result = await servicePosts.findAllPosts()
    setPosts(result.content)
  }
  useEffect(() => {
    findAllPosts()
  }, [])
  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("DD/MM/YYYY");
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
  }
  return (
    <>
      <Slider {...settings}>
        {posts.map((value, index) => {
          return (
            <>
              <div className='box product' key={index}>
                <NavLink className="text-decoration-none" to={`detail/${value.id}`}>
                <div className='img'>
                  <img src={value.image} alt='' width='100%' />
                </div>
                <h6 className="text-black" style={{marginTop:"6px"}}>{value.title}</h6>
                </NavLink>
                <div className="time-post1">{formatDateTime(value.createDate)}</div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default Dcard
