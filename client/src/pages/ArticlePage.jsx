import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import publicArticleService from '../services/publicArticleService.js';
import CommentSection from '../components/CommentSection.jsx';

const ArticlePage = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await publicArticleService.getOne(slug);
        setArticle(res);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOne();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 mb-6">
        By {article.author?.username || 'Unknown'} •{' '}
        {new Date(article.createdAt).toLocaleDateString()}
      </div>
      <div className="prose prose-lg">
        {article.body.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
      <CommentSection articleId={article._id} />
    </div>
  );
};

export default ArticlePage;
