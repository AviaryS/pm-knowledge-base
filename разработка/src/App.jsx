import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Learning from './pages/Learning'
import Matrices from './pages/Matrices'
import ProjectBuilder from './pages/ProjectBuilder'
import MethodologyDetail from './pages/MethodologyDetail'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/matrices" element={<Matrices />} />
          <Route path="/project-builder" element={<ProjectBuilder />} />
          <Route path="/methodology/:id" element={<MethodologyDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

function Navbar() {
  const navigate = useNavigate()
  
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          📚 PM Learning Platform
        </div>
        <div className="navbar-links">
          <Link to="/">Главная</Link>
          <Link to="/learning">Обучение</Link>
          <Link to="/matrices">Матрицы</Link>
          <Link to="/project-builder">Создать проект</Link>
        </div>
      </div>
    </nav>
  )
}

export default App

