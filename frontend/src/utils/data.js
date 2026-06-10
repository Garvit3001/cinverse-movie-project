/**
 * Static movie data for CineVerse.
 * Each movie includes all metadata needed for MovieCard rendering.
 */
const movies = [
  {
    id: 'm001',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    year: 2014,
    rating: 8.7,
    director: 'Christopher Nolan',
    duration: 169,
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    synopsis:
      'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked with piloting a spacecraft to find a new home for humanity among the stars.',
  },
  {
    id: 'm002',
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    director: 'Christopher Nolan',
    duration: 152,
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BytUr46QtB7F.jpg',
    synopsis:
      'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  },
  {
    id: 'm003',
    title: 'Inception',
    genre: 'Thriller',
    year: 2010,
    rating: 8.8,
    director: 'Christopher Nolan',
    duration: 148,
    poster: 'https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
    synopsis:
      'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  },
  {
    id: 'm004',
    title: 'Parasite',
    genre: 'Drama',
    year: 2019,
    rating: 8.5,
    director: 'Bong Joon-ho',
    duration: 132,
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    synopsis:
      'Greed and class discrimination threaten the newly-formed symbiotic relationship between a wealthy family and the destitute clan that latches onto them.',
  },
  {
    id: 'm005',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Animation',
    year: 2023,
    rating: 8.7,
    director: 'Joaquim Dos Santos',
    duration: 140,
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    synopsis:
      'Miles Morales catapults across the multiverse where he encounters a team of Spider-People. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.',
  },
  {
    id: 'm006',
    title: 'Dune: Part Two',
    genre: 'Sci-Fi',
    year: 2024,
    rating: 8.6,
    director: 'Denis Villeneuve',
    duration: 166,
    poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nez7H.jpg',
    synopsis:
      'Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family, facing a choice between the love of his life and the fate of the universe.',
  },
];

/**
 * Static review data for CineVerse.
 */
const reviews = [
  {
    id: 'r001',
    movieId: 'm001',
    movieTitle: 'Interstellar',
    userId: 'u001',
    username: 'johndoe',
    rating: 9,
    comment:
      'An absolute masterpiece of science fiction cinema. The way Nolan weaves theoretical physics with raw human emotion is unmatched. The docking scene still gives me chills every single time.',
    createdAt: '2026-05-28T14:30:00Z',
  },
  {
    id: 'r002',
    movieId: 'm002',
    movieTitle: 'The Dark Knight',
    userId: 'u002',
    username: 'cinephile42',
    rating: 10,
    comment:
      "Heath Ledger's Joker is the single greatest villain performance in cinema history. The film transcends the superhero genre and stands as a gripping crime thriller in its own right.",
    createdAt: '2026-06-01T09:15:00Z',
  },
  {
    id: 'r003',
    movieId: 'm003',
    movieTitle: 'Inception',
    userId: 'u003',
    username: 'dreamwalker',
    rating: 9,
    comment:
      'A mind-bending narrative that rewards repeat viewings. The practical effects combined with the layered dream sequences create an experience unlike anything else. Hans Zimmer\'s score is legendary.',
    createdAt: '2026-06-03T18:45:00Z',
  },
  {
    id: 'r004',
    movieId: 'm004',
    movieTitle: 'Parasite',
    userId: 'u004',
    username: 'filmcritic',
    rating: 9,
    comment:
      'Bong Joon-ho crafted a genre-defying film that shifts from dark comedy to horror to thriller with seamless precision. The social commentary is razor-sharp and deeply resonant.',
    createdAt: '2026-06-05T11:20:00Z',
  },
  {
    id: 'r005',
    movieId: 'm005',
    movieTitle: 'Spider-Man: Across the Spider-Verse',
    userId: 'u005',
    username: 'animefan',
    rating: 10,
    comment:
      'Visually, this is the most stunning animated film ever created. Every single frame is a work of art. The storytelling is bold, the characters are layered, and the cliffhanger left me speechless.',
    createdAt: '2026-06-07T20:00:00Z',
  },
];

export { movies, reviews };
