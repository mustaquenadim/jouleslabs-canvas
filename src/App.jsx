import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/layout/DefaultLayout';
import Canvas from './pages/Canvas';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import './styles/App.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path='canvas' element={<Canvas />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
