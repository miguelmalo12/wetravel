import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Recommend from './pages/Recommend/Recommend';
import Plan from './pages/Plan/Plan';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header/Header';

// ScrollToTop component
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

function App() {
  useEffect(() => {
    console.log('hello')
  })


  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({});



  // console.log(profileData)
  // console.log(isLoggedIn)

  return (
    <div className="App">
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='recommend' element={<Recommend />} />
          <Route path='plan' element={<Plan />} />
          <Route path='*' element={<Home />} />
          <Route
            path='login'
            element={<SignIn API_URL={API_URL} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} setProfileData={setProfileData} />}
          />
          <Route path='sign-up' element={<SignUp API_URL={API_URL} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
