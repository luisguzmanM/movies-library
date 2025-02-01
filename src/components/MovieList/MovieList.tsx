import { useEffect, useState } from "react";
import { MovieItem, Searchbar, GenresList, Button } from "../../components";
import { Movie } from "../../models/movie.model";

export const MovieList = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<{ genre: string; count: number }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (newPage = 1) => {
    if (loading) return;
    setLoading(true);

    const response = await fetch("/movies-library/data.json");
    const dataJson = await response.json();
    console.log('hey', dataJson)

    const startIndex = (newPage - 1) * 20;
    const newMovies = dataJson.data.slice(startIndex, startIndex + 20);

    const updatedData = [...data, ...newMovies];
    setData(updatedData);
    setGenres(getGenres(updatedData));
    applyFilters(updatedData, searchQuery, selectedGenres);

    setLoading(false);
  };

  const getGenres = (data: Movie[]) => {
    const genreCount = data
      .flatMap((movie) => movie.genres)
      .reduce((acc: Record<string, number>, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});
    return Object.entries(genreCount).map(([genre, count]) => ({ genre, count }));
  };

  const applyFilters = (movies: Movie[], query: string, genres: string[]) => {
    let filtered = movies;
    
    if (query) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (genres.length > 0) {
      filtered = filtered.filter((movie) =>
        genres.every((genre) => movie.genres.includes(genre))
      );
    }
    
    setFilteredMovies(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(data, query, selectedGenres);
  };

  const handleGenreSelect = (genre: string, isChecked: boolean) => {
    const updatedGenres = isChecked
      ? [...selectedGenres, genre]
      : selectedGenres.filter((g) => g !== genre);
    
    setSelectedGenres(updatedGenres);
    applyFilters(data, searchQuery, updatedGenres);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:w-3xl mx-auto min-h-screen">
      <h1 className="text-xl sm:text-4xl py-5 px-5 md:px-0">What do you want to watch tonight?</h1>
      <Searchbar onSearch={handleSearch} />
      {filteredMovies.length > 0 ? (
        <div className="flex gap-5">
          <ul className="bg-white w-full">
            {filteredMovies.map((movie: Movie, index: number) => (
              <MovieItem key={index} movie={movie} />
            ))}
          </ul>
          <GenresList genres={genres} onGenreSelect={handleGenreSelect} />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-center mt-5 mb-5">No movies found</p>
          <Button
            label="Clear filter"
            parentMethod={() => {
              setSearchQuery("");
              setSelectedGenres([]);
              setFilteredMovies(data);
            }}
          />
        </div>
      )}
      {loading && <p className="text-center mt-5">Loading more movies...</p>}
    </div>
  );
};