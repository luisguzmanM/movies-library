interface Props {
  genre: { genre: string; count: number };
  id: number;
  onGenreSelect: (genre: string, isChecked: boolean) => void;
}

export const GenreItem = ({ genre, id, onGenreSelect }:Props) => {

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    onGenreSelect(genre.genre, event.target.checked);
  };


  return (
    <div className="flex items-center gap-2 mb-2">
      <input type="checkbox" id={`category-${id}`} className="cursor-pointer" onChange={handleCheckboxClick}/>
      <label htmlFor={`category-${id}`} className="cursor-pointer text-xs">{genre.genre}</label>
      <span className="text-xs border border-gray-300 rounded-3xl px-1">{genre.count}</span>
    </div>
  );
}