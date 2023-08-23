import axios from "axios";
import {toast} from "react-toastify";

export const addShoppingCart = async (quantity, idProduct) => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:8080/api/shoppingCart/add?quantity=${quantity}&idRacing=${idProduct}`, "",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
}
export const listShoppingCart = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = (await axios.get('http://localhost:8080/api/shoppingCart',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
        return res
    } catch (e) {
        console.log(e)
    }
}
export const deleteShopping = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.delete(`http://localhost:8080/api/shoppingCart/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return res;
    } catch (e) {
        console.log(e)
    }
}
export const setQuantityShopping = async (setQuantity, id) => {
    const token = localStorage.getItem('token');
    try {
        const res = (await axios.patch(`http://localhost:8080/api/shoppingCart/${setQuantity}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }));
        return res
    }catch (e) {
        return toast.error(e.response.data)
    }
}