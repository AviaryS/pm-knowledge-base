import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Learning.css'

const methodologies = [
  { id: 'agile', name: 'Agile', icon: '🔄', description: 'Гибкая методология разработки' },
  { id: 'scrum', name: 'Scrum', icon: '⚡', description: 'Фреймворк для реализации Agile' },
  { id: 'kanban', name: 'Kanban', icon: '📋', description: 'Метод визуализации работы' },
  { id: 'scrumban', name: 'Scrumban', icon: '🔀', description: 'Гибрид Scrum и Kanban' },
  { id: 'waterfall', name: 'Waterfall', icon: '💧', description: 'Каскадная модель разработки' },
  { id: 'safe', name: 'SAFe', icon: '🏢', description: 'Scaled Agile Framework' }
]

const learningPlans = [
  {
    title: 'План изучения PM с нуля',
    duration: '12 недель',
    description: 'Систематическое изучение Project Management от основ до продвинутых практик',
    topics: ['Основы PM', 'Планирование', 'Agile и Scrum', 'Управление стейкхолдерами', 'Риски', 'Инструменты']
  },
  {
    title: 'План изучения Agile',
    duration: '8 недель',
    description: 'Глубокое погружение в Agile методологии и практики',
    topics: ['Основы Agile', 'Scrum Framework', 'Kanban', 'User Stories', 'Estimation', 'Continuous Improvement']
  },
  {
    title: 'План изучения инструментов',
    duration: '6 недель',
    description: 'Освоение ключевых инструментов и техник Project Management',
    topics: ['Матрицы анализа', 'Приоритизация', 'Риски', 'Визуализация', 'Оценка', 'Документация']
  }
]

function Learning() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className="learning">
      <div className="learning-header">
        <h1>📚 Обучение Project Management</h1>
        <p>Выбери методологию или план обучения</p>
      </div>

      <div className="learning-sections">
        <section className="methodologies-section">
          <h2>Методологии</h2>
          <div className="methodologies-grid">
            {methodologies.map(method => (
              <Link 
                key={method.id} 
                to={`/methodology/${method.id}`}
                className="methodology-card"
              >
                <div className="methodology-icon">{method.icon}</div>
                <h3>{method.name}</h3>
                <p>{method.description}</p>
                <span className="learn-more">Изучить →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="plans-section">
          <h2>Планы обучения</h2>
          <div className="plans-grid">
            {learningPlans.map((plan, index) => (
              <div 
                key={index}
                className="plan-card"
                onClick={() => setSelectedPlan(selectedPlan === index ? null : index)}
              >
                <div className="plan-header">
                  <h3>{plan.title}</h3>
                  <span className="duration">{plan.duration}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
                {selectedPlan === index && (
                  <div className="plan-details">
                    <h4>Темы обучения:</h4>
                    <ul>
                      {plan.topics.map((topic, i) => (
                        <li key={i}>✓ {topic}</li>
                      ))}
                    </ul>
                    <button className="start-plan-btn">Начать обучение</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Learning

