import { GenreItem } from '../../components'

interface Props {
  genres: Genre[];
  onGenreSelect: (genre: string, isChecked: boolean) => void;
}

interface Genre {
  genre: string;
  count: number;
}

export const GenresList = ({genres, onGenreSelect}:Props) => {
  return (
    <div className='hidden md:block'>
      {genres.map((genre:Genre, index:number) => <GenreItem key={index} genre={genre} id={index} onGenreSelect={onGenreSelect}/>)}
    </div>
  );
}