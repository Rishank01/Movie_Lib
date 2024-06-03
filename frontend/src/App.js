import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import { useState} from 'react';
import Movies from './components/Movies';

function App() {

  const [movies , setMovies] = useState([]);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(localStorage.getItem('token') !== null);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<HomePage setMovies = {setMovies} setUserIsLoggedIn = {setUserIsLoggedIn} userIsLoggedIn = {userIsLoggedIn}/>}></Route>
          <Route path='/login' exact element={<Login/>}></Route>
          <Route path='/signup' exact element={<SignUp/>}></Route>
          <Route path='/movies' exact element={<Movies movies = {movies} setUserIsLoggedIn={setUserIsLoggedIn}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;