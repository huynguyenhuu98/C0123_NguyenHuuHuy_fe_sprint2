import axios from "axios";
export const findAllProductRacing = async (name) =>{
    const result = await axios.get(`http://localhost:8080/api/product?nameSearch=${name}`)
    return result.data
}
export const findAllProductDetail = async () =>{
    const result = await axios.get(`http://localhost:8080/api/product`)
    return result.data
}
export const detailProduct = async (id) =>{
    const result = await axios.get(`http://localhost:8080/api/product/detailProduct/${id}`)
    return result.data;
}
export const findByNameProduct = async (name) => {
    // const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/product?nameSearch=${name}`,
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        // }
        )
    return result.data
}