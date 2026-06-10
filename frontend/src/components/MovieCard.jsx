import { useNavigate } from 'react-router-dom';

/**
 * MovieCard — Reusable card component for rendering movie information.
 *
 * Props:
 * @param {object}  movie          - Movie data object
 * @param {string}  movie.id       - Unique movie identifier
 * @param {string}  movie.title    - Movie title
 * @param {string}  movie.genre    - Primary genre
 * @param {number}  movie.year     - Release year
 * @param {number}  movie.rating   - IMDb-style rating (0-10)
 * @param {string}  movie.director - Director name
 * @param {number}  movie.duration - Duration in minutes
 * @param {string}  movie.poster   - Poster image URL
 * @param {string}  movie.synopsis - Brief plot summary
 */
function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleViewReviews = () => {
    navigate('/reviews', { state: { movieId: movie.id } });
  };

  return (
    <article className="movie-card" id={`movie-card-${movie.id}`}>
      <div className="movie-card__poster-wrapper">
        <img
          className="movie-card__poster"
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        <div className="movie-card__rating-badge">
          <span>★</span>
          <span>{movie.rating}</span>
        </div>

        <div className="movie-card__genre-badge">{movie.genre}</div>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.title}</h3>

        <div className="movie-card__meta">
          <span>{movie.year}</span>
          <span className="movie-card__meta-separator" />
          <span>{movie.director}</span>
          <span className="movie-card__meta-separator" />
          <span>{movie.duration} min</span>
        </div>

        <p className="movie-card__synopsis">{movie.synopsis}</p>
      </div>

      <div className="movie-card__actions">
        <button
          className="movie-card__btn movie-card__btn--primary"
          onClick={handleViewReviews}
          id={`view-reviews-${movie.id}`}
        >
          Reviews
        </button>
        <button
          className="movie-card__btn movie-card__btn--secondary"
          id={`watchlist-${movie.id}`}
        >
          + Watchlist
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
