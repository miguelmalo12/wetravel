import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// recoil state
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { userState } from './state/userState';
import { loginState } from './state/loginState';
import { signUpStatusState } from './state/signUpStatusState';

//pages
import Home from './pages/Home';
import RecommendPage from './pages/RecommendPage/RecommendPage';
import Plan from './pages/Plan/Plan';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import StatusPage from './pages/StatusPage/StatusPage';

// components
import Header from './components/Header/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const setUser = useSetRecoilState(userState);
  const [profileData, setProfileData] = useState({});
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  const signUpStatusPage = useRecoilValue(signUpStatusState)

  // check if user is logged in every time the app renders
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
    setIsLoading(false);
  }, [setUser, setLoggedIn]);
  // spinner while checking if user is logged in
  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header API_URL={API_URL} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recommend"
            element={
              loggedIn ? <RecommendPage API_URL={API_URL} /> : <Navigate to="/sign-up" />
            }
          />
          <Route
            path="/plan"
            element={
              loggedIn ? <Plan profileData={profileData} /> : <Navigate to="/sign-up" />
            }
          />
          <Route
            path="login"
            element={<SignIn API_URL={API_URL} setProfileData={setProfileData} />}
          />
          <Route
            path="sign-up"
            element={
              signUpStatusPage ? (
                <StatusPage
                  title="Thanks for registering"
                  text="Your perfect destination, one click away."
                />
              ) : (
                <SignUp API_URL={API_URL} />
              )
            }
          />
          <Route
            path="*"
            element={
              <StatusPage
                title=" Oops! Page Not Found"
                text="The page you are looking for was moved, removed, renamed or never existed."
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
