import axios from "axios";
import api from "./api.js";

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});



const getAllComments = async (id) => {
    try {
        const res = await publicApi.get(`/articles/${id}/comments`);
        return res.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
}

const addComment = async (id, comment) => {
    try {
        const res = await api.post(`/articles/${id}/comment`, comment);
        return res.data;
    }
    catch (error) {
        console.error("Error adding comment", error);
    }
}

export default { getAllComments, addComment };


