// src/components/SubmitReview.jsx

import React, { useState } from 'react';

const SubmitReview = () => {
  const [rating, setRating] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, title, text });
  };

  const handleCancel = () => {
    setRating('');
    setTitle('');
    setText('');
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Submit Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 mb-2">Rating (1-5):</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="block w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">Review Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter the title of your review"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="text" className="block text-gray-700 mb-2">Review Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block w-full border border-gray-300 p-2 rounded-md"
            rows="4"
            placeholder="Write your review here..."
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitReview;