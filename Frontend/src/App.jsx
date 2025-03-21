import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Sell from './pages/Sell';
import { LikesProvider } from './context/LikesContext';
import LikesList from './pages/LikesList';
import AddBookPage from './pages/AddBookPage';
import Login from './components/Login'; 
import Signup from './components/Login';
import Protected from './components/Login';
import Navbar from './components/Login';


function App() {
  return (
    <>
    <LikesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sell' element={<Sell />} />
          <Route path='/likes' element={<LikesList />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/protected' element={<Protected />} />
        </Routes>
      </Router>
    </LikesProvider>
    </>
  )
}

export default App
