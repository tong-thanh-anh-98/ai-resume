import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import ResumeBuilder from './pages/ResumeBuilder';
import Dashboard from './pages/Dashboard';
import Preview from './pages/Preview';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector(state => state.auth);

  const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoading(true));
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(login({ user: data, token }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
      </Routes>
    </>
  )
}

export default App;