interface Props {
  onSearch: (query:string) => void
}

export const Searchbar = ({onSearch}:Props) => {
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  }
  
  return (
    <div className="flex justify-center bg-gray-100 px-5 md:px-0">
      <input
        type="text" 
        className="p-2 w-full mb-5 border px-5" 
        placeholder="Search Movies"
        onChange={handleInputChange}/>
    </div>
  );
}