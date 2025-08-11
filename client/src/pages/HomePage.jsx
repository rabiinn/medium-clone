import { useEffect, useState } from "react";
import publicArticleService from "../services/publicArticleService.js";
import Article from "../components/Article.jsx";
const HomePage = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try{
                const res = await publicArticleService.getAllPublic();
                setArticles(res.articles);
            }
            catch(error) {
                console.log('Failed to fetch the articles', error);
            }
            
        }
        fetchArticles();
    },[]);

    return (
        <div>
            <h1>Medium by Rabin</h1>
            {articles.map(article => (
                <Article  key={article._id} article={article}/>
            ))}
        </div>
    )
};

export default HomePage;