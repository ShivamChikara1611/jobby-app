import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import AllJobs from './components/AllJobs';
import AboutJobItem from './components/AboutJobItem';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <div className='mx-4 sm:mx-[10%]'>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/jobs" element={<AllJobs />} />
      <Route path="/jobs/:id" element={<AboutJobItem />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
  </div>
);

export default App;
