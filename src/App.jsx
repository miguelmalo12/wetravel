import './main.scss';
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
  return (
    <div className="App">
      
      <BrowserRouter>
        <ScrollToTop /> 
       
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='recommend' element={<Recommend />} />
          <Route path='plan' element={<Plan />} />
          <Route path='*' element={<Home />} />
          <Route path='login' element={<SignIn/>}/>
          <Route path='signup' element={<SignUp/>}/>
        </Routes>

      </BrowserRouter>

      
    </div>
  );
}

export default App;
