import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={ < Home/> } />
    </Routes>
  );
}

export default App;
