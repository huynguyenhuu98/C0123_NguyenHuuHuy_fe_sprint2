import axios from "axios";
export const findAllPosts = async () =>{
    const result = await axios.get(`http://localhost:8080/api/posts?_sort=title&_order=desc`,)
    return result.data
}
export const detail = async (id) =>{
    const result = await axios.get(`http://localhost:8080/api/posts/detailPosts/${id}`)
    return result.data
}
export const findByName = async (title) => {
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/posts?titleSearch=${title}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}