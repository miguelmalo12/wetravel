import './main.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Recommend from './pages/Recommend/Recommend';
import TravelPlanner from './pages/TravelPlanner/TravelPlanner';
import Footer from './components/Footer/Footer';

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
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='recommend' element={<Recommend />} />
          <Route path='plan' element={<TravelPlanner />} />
          <Route path='*' element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      
    </div>
  );
}

export default App;
