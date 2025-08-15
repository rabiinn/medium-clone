import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp } from '@fortawesome/free-solid-svg-icons';
const Comment = ({ comment }) => {

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex items-center text-sm text-gray-500">
                <img
                    src={comment.author.image}
                    alt={comment.author.username}
                    className="w-8 h-8 rounded-full object-cover mr-2.5"
                />
                <span className="font-bold mr-2 text-gray-700">
                    {comment.author.name}
                    {console.log(comment.author)}
                </span>
                <span>
                    • {new Date(comment.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </span>
            </div>
            <div className="mb-3 text-base text-gray-800">
                {comment.body}
            </div>
            <button
                type="button"
                className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
            >
                <FontAwesomeIcon icon={faThumbsUp} className="h-5 w-5 mr-1" />
                <span>Like</span>
            </button>
        </div>
    );
}

export default Comment;
