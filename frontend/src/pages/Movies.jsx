import MovieCard from '../components/MovieCard';
import { movies } from '../utils/data';

/**
 * Movies — Displays all movies in a responsive grid using MovieCard components.
 */
function Movies() {
  return (
    <div className="page" id="movies-page">
      <div className="container movies">
        <header className="movies__header">
          <h1 className="movies__title">🍿 Movies</h1>
          <p className="movies__count">
            Showing {movies.length} titles in our collection
          </p>
        </header>

        <div className="movies__grid" id="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
