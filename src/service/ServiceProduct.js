import axios from "axios";
export const findAllProductRacing = async () =>{
    const result = await axios.get(`http://localhost:8080/api/product?_sort=nameRacing&_order=desc`,)
    return result.data
}