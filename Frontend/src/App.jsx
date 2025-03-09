import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Sell from './pages/Sell';
import { LikesProvider } from './context/LikesContext';
import LikesList from './pages/LikesList';

function App() {
  return (
    <>
    <LikesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sell' element={<Sell />} />
          <Route path='/likes' element={<LikesList />} />
        </Routes>
      </Router>
    </LikesProvider>
    </>
  )
}

export default App
