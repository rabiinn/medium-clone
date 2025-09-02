import { Link } from 'react-router-dom';
const Article = ({ article }) => {
  return (
    <Link key={article._id} to={`articles/${article.slug}`}>
      <div key={article._id} className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-2">
          By {article.author?.username || 'unknown'}
        </p>

        <p className="mb-4">
          {article.body.length > 200
            ? article.body.slice(0, 200) + '...'
            : article.body}
        </p>
      </div>
    </Link>
  );
};

export default Article;
