import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, GenreBadge } from '../../components';
import { Movie } from '../../models/movie.model';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const fetchMovieDetails = async () => {
    const response = await fetch(`/movies-library/data.json`);
    const dataJson = await response.json();
    const movieData = dataJson.data.find((movie: Movie) => movie.id === Number(id));
    const similarMoviesData = await getSimilarMovies(dataJson.data, movieData);
    setSimilarMovies(similarMoviesData);
    setMovie(movieData);
  };

  const getSimilarMovies = async (allMovies: Movie[], selectedMovie: Movie) => {
    return allMovies.filter((movie: Movie) => movie.genres.some((genre) => selectedMovie.genres.includes(genre))).splice(0,12);
  }

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className='h-screen flex justify-center'>Loading movie details...</div>;
  }

  return (
    <div className="md:w-3xl mx-auto p-5">
      <div className='mb-5'>
        <Button label='Back' parentMethod={() => navigate('/')}/>
      </div>
      <div className="md:flex gap-5">
        <div className='w-sm max-w-full'>
          <img src={movie.poster_path} alt={movie.title} className="mb-5" />
        </div>
        <div className='w-sm max-w-full'>
          <h1 className="font-bold mb-5 mt-5 text-2xl">{movie.title}</h1>
          <p className="mb-5">{movie.overview}</p>
          <p className='mb-5'><strong>Release Date:</strong> {movie.release_date}</p>
          <p className='mb-5'><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
          <div className="mb-5 flex gap-2 flex-wrap">
            {movie.genres.map((genre, index) => (
              <GenreBadge key={index} genre={genre}/>
            ))}
          </div>
          <Button label="Rent for $3.99" parentMethod={() => alert('Renting not available yet!')}/>
        </div>
      </div>
      <h2 className='mt-5 mb-5 text-xl'>Looking similar</h2>
      <div className="flex gap-5 mt-5 flex-wrap justify-center">
        {
          similarMovies.map((movie: Movie, index:number) => {
            return (
              <img key={index} src={movie.poster_path} alt={movie.title} className="w-25 md:w-25" />
            )
          })
        }
      </div>
    </div>
  );
};