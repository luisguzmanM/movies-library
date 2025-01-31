import { MovieDetail, MovieList } from "./components"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="bg-gray-100">
        <Routes>
          <Route path="/" element={<MovieList/>}/>
          <Route path="/movie/:id" element={<MovieDetail/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App