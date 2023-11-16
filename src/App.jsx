import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import Recommend from './pages/Recommend/Recommend';
import Plan from './pages/Plan/Plan';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header/Header';


function App() {

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='recommend'
            element={<Recommend
              isLoggedIn={isLoggedIn}
              profileData={profileData}
            />} />
          <Route
            path='plan'
            element={<Plan
              isLoggedIn={isLoggedIn}
              profileData={profileData}
            />} />
          <Route path='*' element={<Home />} />
          <Route
            path='login'
            element={<SignIn
              API_URL={API_URL}
              isLoggedIn={isLoggedIn}
              setLoggedIn={setLoggedIn}
              setProfileData={setProfileData}
            />}
          />
          <Route
            path='sign-up'
            element={<SignUp
              API_URL={API_URL}
            />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
