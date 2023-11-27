import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// recoil state
import { useSetRecoilState } from 'recoil';
import { userState } from './state/userState';

import Home from './pages/Home';
import RecommendPage from './pages/RecommendPage/RecommendPage';
import Plan from './pages/Plan/Plan';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header/Header';
import StatusPage from './pages/StatusPage/StatusPage';

function App() {

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const setUser = useSetRecoilState(userState);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({});

  // check if user is logged in every time the app renders
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, [setUser]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route
            path='recommend'
            element={<RecommendPage
              isLoggedIn={isLoggedIn}
              profileData={profileData}
            />} />
          <Route
            path='plan'
            element={<Plan
              isLoggedIn={isLoggedIn}
              profileData={profileData}
            />} />
          <Route path='*' element={<StatusPage title=' Oops! Page Not Found' text='The page you are looking for was moved, removed, renamed or never existed.' />} />
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
