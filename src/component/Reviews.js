import React from 'react';

const Reviews = ({ reviews }) => {
  return (
    <div>
      <h2>Customer Reviews</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
            <h4>{review.name}</h4>
            <p>{"⭐".repeat(review.stars)} ({review.stars}/5)</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
