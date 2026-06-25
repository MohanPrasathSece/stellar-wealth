import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/education" element={<div>Education</div>} />
      <Route path="/privacy" element={<div>Privacy Policy</div>} />
      <Route path="/terms" element={<div>Terms and Conditions</div>} />
    </Routes>
  );
}

export default App;
