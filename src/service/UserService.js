import axios from "axios";

export const login = async (value) => {
    const token = localStorage.getItem('token');

    try {
        const res = (await axios.post('http://localhost:8080/api/user/authenticate', value,
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