import { Button, GenreBadge } from "../../components";
import { useNavigate } from 'react-router-dom';

interface Props {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    genres: string[];
  }
}

export const MovieItem = ({movie}:Props) => {
  const {id, title, overview, poster_path, genres} = movie;
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="md:flex md:justify-center gap-5 p-5 border-b border-gray-300">
      <img src={poster_path} alt={title}/>
      <div className="w-sm max-w-full">
        <h2 className="font-bold mb-5 mt-5 md:text-2xl">{title}</h2>
        <p className="mb-5">{overview}</p>
        <div className="mb-5 flex gap-2 flex-wrap">
          {genres.map((genre:string, index:number) => (
            <GenreBadge key={index} genre={genre}/>
          ))}
        </div>
        <Button label="View details and rent" parentMethod={handleDetailsClick}
        />
      </div>
    </div>
  );
}