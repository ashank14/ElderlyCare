
import './App.css'
import Login from './pages/login';
import Signup from './pages/signup';
import Home
 from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </Router>

  )
}

export default App
