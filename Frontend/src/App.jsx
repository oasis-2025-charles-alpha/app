import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Sell from './pages/Sell';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sell' element={<Sell />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
