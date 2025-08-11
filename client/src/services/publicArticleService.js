import axios from "axios";

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})


const getAllPublic = async () => {
    try {
        const res = await publicApi.get('/articles');
        return res.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
}

const getOne = async (slug) => {
    try {
        const res = await publicApi.get(`/articles/${slug}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching article ${slug}:`, error);
        throw error;
    }
}

export default {getAllPublic, getOne };



