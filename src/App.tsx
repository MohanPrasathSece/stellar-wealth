import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Education from './pages/education';
import Privacy from './pages/privacy';
import Terms from './pages/terms';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/education" element={<Education />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;
