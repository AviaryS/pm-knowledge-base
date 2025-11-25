import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>🎯 IT Project Management</h1>
        <p className="subtitle">Интерактивная платформа для изучения управления проектами</p>
        <div className="hero-buttons">
          <Link to="/learning" className="btn btn-primary">Начать обучение</Link>
          <Link to="/project-builder" className="btn btn-secondary">Создать проект</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📖</div>
          <h3>Методологии</h3>
          <p>Изучи Agile, Scrum, Kanban и другие подходы к управлению проектами</p>
          <Link to="/learning" className="feature-link">Изучить →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Матрицы и инструменты</h3>
          <p>Освой матрицы стейкхолдеров, RACI, приоритетов и другие инструменты PM</p>
          <Link to="/matrices" className="feature-link">Изучить →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🛠️</div>
          <h3>Создать проект</h3>
          <p>Примени знания на практике - создай и настрой свой проект с нуля</p>
          <Link to="/project-builder" className="feature-link">Создать →</Link>
        </div>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">6</div>
          <div className="stat-label">Методологий</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">5</div>
          <div className="stat-label">Матриц</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">3</div>
          <div className="stat-label">Плана обучения</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">27+</div>
          <div className="stat-label">Материалов</div>
        </div>
      </div>
    </div>
  )
}

export default Home

