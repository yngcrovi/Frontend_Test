import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './component/App/App';
import Registration from './component/Registration/Registration';
import Login from './component/Login/Login';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  </BrowserRouter>
)