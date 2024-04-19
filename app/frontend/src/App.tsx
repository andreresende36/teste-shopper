import { Routes, Route } from 'react-router-dom';
import CsvUploadComponent from './components/CsvUploadComponent';
import './styles/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ < CsvUploadComponent/> } />
    </Routes>
  );
}

export default App;
