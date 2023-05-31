import './main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import TravelPlanner from './pages/TravelPlanner/TravelPlanner';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='plan' element={<TravelPlanner />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
