import { reviews } from '../utils/data';

/**
 * Reviews — Displays all movie reviews in a list layout.
 * Each review card shows the movie title, star rating, comment, and author.
 */
function Reviews() {
  /**
   * Renders star icons for a given numeric rating (out of 10).
   * Converts to a 5-star scale for display.
   */
  const renderStars = (rating) => {
    const stars = Math.round(rating / 2); // convert 10-scale to 5-scale
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={
          i < stars ? 'review-card__star--filled' : 'review-card__star--empty'
        }
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="page" id="reviews-page">
      <div className="container reviews">
        <header className="reviews__header">
          <h1 className="reviews__title">📝 Community Reviews</h1>
          <p className="reviews__subtitle">
            {reviews.length} reviews from passionate cinephiles
          </p>
        </header>

        <div className="reviews__list" id="reviews-list">
          {reviews.map((review) => (
            <article
              className="review-card"
              key={review.id}
              id={`review-${review.id}`}
            >
              <div className="review-card__top">
                <h2 className="review-card__movie">{review.movieTitle}</h2>
                <div className="review-card__stars">
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="review-card__comment">{review.comment}</p>

              <div className="review-card__footer">
                <div className="review-card__avatar">
                  {review.username.charAt(0).toUpperCase()}
                </div>
                <span>{review.username}</span>
                <span>·</span>
                <span>{formatDate(review.createdAt)}</span>
                <span>·</span>
                <span>{review.rating}/10</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
