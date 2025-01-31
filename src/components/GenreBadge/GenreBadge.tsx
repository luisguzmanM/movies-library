interface Props {
  genre: string;
}

export const GenreBadge = ({genre}:Props) => {
  return (
    <span className="py-1 px-4 border rounded-2xl border-gray-300">{genre}</span>
  );
}