import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Sell from './pages/Sell';
import { LikesProvider } from './context/LikesContext';
import LikesList from './pages/LikesList';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://127.0.0.1:5000/professors')
      setData(response.data.professors)
    })()
  }, [])

  const onCreateClick = async () => {
    axios.post('http://127.0.0.1:5000/create_professor', {
      professorFname: "Charles",
      professorLname: 'Gu',
    })
  }

  return (
    <>
      <button onClick={onCreateClick}>Click me to create professor</button>
      {
        data.map(entry => (
          <span key={entry.id}>
            ID: {entry.id} professorFname: { entry.professorFname }
          </span>
        ))
      }
      {/* <LikesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sell' element={<Sell />} />
          <Route path='/likes' element={<LikesList />} />
        </Routes>
      </Router>
    </LikesProvider> */}
    </>
  )
}

export default App
