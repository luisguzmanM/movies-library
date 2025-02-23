import { MovieDetail, MovieList } from "./components";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-gray-100">
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
