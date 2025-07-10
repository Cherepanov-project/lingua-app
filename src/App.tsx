import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Routes>
      {/* Главная страница */}
      <Route path="/" element={<HomePage />} />
      
      {/* Админ-панель */}
      <Route path="/admin/*" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
