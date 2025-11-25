import { useState } from 'react'
import './Matrices.css'

const matrices = [
  {
    id: 'stakeholder',
    name: 'Матрица стейкхолдеров',
    description: 'Анализ заинтересованных сторон по влиянию и интересу',
    quadrants: [
      { name: 'Manage Closely', desc: 'Высокое влияние + Высокий интерес', color: '#ef4444' },
      { name: 'Keep Satisfied', desc: 'Высокое влияние + Низкий интерес', color: '#f59e0b' },
      { name: 'Keep Informed', desc: 'Низкое влияние + Высокий интерес', color: '#3b82f6' },
      { name: 'Monitor', desc: 'Низкое влияние + Низкий интерес', color: '#10b981' }
    ]
  },
  {
    id: 'raci',
    name: 'RACI матрица',
    description: 'Определение ролей и ответственности в проекте',
    roles: ['R - Responsible', 'A - Accountable', 'C - Consulted', 'I - Informed']
  },
  {
    id: 'priority',
    name: 'Матрица приоритетов',
    description: 'Определение приоритетов задач (MoSCoW)',
    categories: [
      { name: 'Must Have', desc: 'Обязательно', color: '#ef4444' },
      { name: 'Should Have', desc: 'Желательно', color: '#f59e0b' },
      { name: 'Could Have', desc: 'Можно', color: '#3b82f6' },
      { name: "Won't Have", desc: 'Не будем делать', color: '#9ca3af' }
    ]
  },
  {
    id: 'risk',
    name: 'Матрица рисков',
    description: 'Оценка и приоритизация рисков проекта',
    levels: [
      { name: 'Критический', desc: 'Высокая вероятность + Высокое влияние', color: '#ef4444' },
      { name: 'Высокий', desc: 'Требует внимания', color: '#f59e0b' },
      { name: 'Средний', desc: 'Отслеживать', color: '#fbbf24' },
      { name: 'Низкий', desc: 'Минимальное внимание', color: '#10b981' }
    ]
  },
  {
    id: 'impact-effort',
    name: 'Impact/Effort матрица',
    description: 'Оценка задач по влиянию и усилиям',
    quadrants: [
      { name: 'Quick Wins', desc: 'Высокое влияние + Низкие усилия', color: '#10b981' },
      { name: 'Major Projects', desc: 'Высокое влияние + Высокие усилия', color: '#3b82f6' },
      { name: 'Fill-ins', desc: 'Низкое влияние + Низкие усилия', color: '#f59e0b' },
      { name: 'Time Sinks', desc: 'Низкое влияние + Высокие усилия', color: '#ef4444' }
    ]
  }
]

function Matrices() {
  const [selectedMatrix, setSelectedMatrix] = useState(null)
  const [showBuilder, setShowBuilder] = useState(false)

  return (
    <div className="matrices">
      <div className="matrices-header">
        <h1>📊 Матрицы и инструменты PM</h1>
        <p>Изучи и используй матрицы для анализа и принятия решений</p>
      </div>

      <div className="matrices-grid">
        {matrices.map(matrix => (
          <div 
            key={matrix.id}
            className="matrix-card"
            onClick={() => setSelectedMatrix(selectedMatrix === matrix.id ? null : matrix.id)}
          >
            <h3>{matrix.name}</h3>
            <p>{matrix.description}</p>
            {selectedMatrix === matrix.id && (
              <div className="matrix-details">
                {matrix.quadrants && (
                  <div className="quadrants">
                    {matrix.quadrants.map((q, i) => (
                      <div key={i} className="quadrant" style={{ borderLeft: `4px solid ${q.color}` }}>
                        <strong>{q.name}</strong>
                        <p>{q.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                {matrix.categories && (
                  <div className="categories">
                    {matrix.categories.map((cat, i) => (
                      <div key={i} className="category" style={{ borderLeft: `4px solid ${cat.color}` }}>
                        <strong>{cat.name}</strong>
                        <p>{cat.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                {matrix.roles && (
                  <div className="roles">
                    {matrix.roles.map((role, i) => (
                      <div key={i} className="role-item">
                        <strong>{role}</strong>
                      </div>
                    ))}
                  </div>
                )}
                {matrix.levels && (
                  <div className="risk-levels">
                    {matrix.levels.map((level, i) => (
                      <div key={i} className="risk-level" style={{ borderLeft: `4px solid ${level.color}` }}>
                        <strong>{level.name}</strong>
                        <p>{level.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button 
                  className="use-matrix-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowBuilder(true)
                  }}
                >
                  Использовать матрицу
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showBuilder && (
        <MatrixBuilderDialog 
          onClose={() => setShowBuilder(false)}
          matrix={matrices.find(m => m.id === selectedMatrix)}
        />
      )}
    </div>
  )
}

function MatrixBuilderDialog({ onClose, matrix }) {
  if (!matrix) return null

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>Использовать: {matrix.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="dialog-body">
          <p>Здесь будет интерактивный инструмент для заполнения матрицы</p>
          <p className="coming-soon">🚧 В разработке</p>
        </div>
      </div>
    </div>
  )
}

export default Matrices

