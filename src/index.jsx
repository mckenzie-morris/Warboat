import './styles.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Options from './pages/Options.jsx';
import NotFound from './pages/NotFound.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/leaderboard' element={<Leaderboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/options' element={<Options />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
