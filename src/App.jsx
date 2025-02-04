import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import StudentPage from './pages/StudentPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/students" element={<StudentPage/>}  />
      </Routes>
    </Router>
  )
}

export default App
