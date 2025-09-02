import { useState } from 'react';

const CreateArticlePage = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [genre, setGenre] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !body.trim()) {
      setError('Title and body are required.');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit?.({
        title,
        body,
        genre,
      });
      setTitle('');
      setBody('');
      setGenre('');
    } catch {
      setError('Failed to create article.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Write a story</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow space-y-6"
      >
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <input
          className="w-full text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-green-600 py-2 mb-4"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        <textarea
          className="w-full min-h-[200px] border-none focus:outline-none text-lg resize-y bg-gray-50 rounded p-4"
          placeholder="Tell your story..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={submitting}
        />
        <input
          className="w-full border-b border-gray-200 focus:outline-none focus:border-green-600 py-2"
          placeholder="Add tags (comma separated)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          disabled={submitting}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-2 rounded-full font-semibold hover:bg-green-700 transition disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticlePage;
