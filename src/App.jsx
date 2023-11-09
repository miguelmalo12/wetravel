import './App.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recommend from './pages/Recommend/Recommend';
import Plan from './pages/Plan/Plan';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  console.log(API_URL)

  return (
    <div className="App">

      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='recommend' element={<Recommend />} />
          <Route path='plan' element={<Plan />} />
          <Route path='*' element={<Home />} />
          <Route path='login' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp API_URL={API_URL} />} />
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
