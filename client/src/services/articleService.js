import api from "./api";

const createArticle = async (articleData, token) => {
   try {
     const response = await api.post(`/articles`,articleData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    );
    return response.data;
   }
   catch (error){
    console.log(error);
    console.log('error');
   }
}


export default { createArticle }