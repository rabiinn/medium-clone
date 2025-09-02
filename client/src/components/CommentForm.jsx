import { useState } from 'react';

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    // Simulate API call
    const addedComment = await addComment({
      body: comment,
    });
    if (addedComment) {
      setComment('');
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-300 rounded p-4 mt-6 shadow-sm"
    >
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows={4}
        className="w-full border-none outline-none resize-y text-base p-2 bg-gray-50 rounded mb-3 focus:bg-white focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        disabled={submitting}
      />

      <div className="text-right">
        <button
          type="submit"
          disabled={submitting || !comment.trim()}
          className="bg-green-600 text-white border-none rounded-full px-6 py-2 font-semibold cursor-pointer hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
