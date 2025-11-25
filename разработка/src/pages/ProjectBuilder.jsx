import { useState } from 'react'
import './ProjectBuilder.css'

function ProjectBuilder() {
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    methodology: '',
    teamSize: '',
    duration: '',
    features: []
  })
  const [showDialog, setShowDialog] = useState(false)

  const methodologies = ['Agile', 'Scrum', 'Kanban', 'Scrumban', 'Waterfall']
  const teamSizes = ['1-3', '4-7', '8-12', '13+']
  const durations = ['1-3 месяца', '3-6 месяцев', '6-12 месяцев', '12+ месяцев']

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else {
      setShowDialog(true)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleChange = (field, value) => {
    setProjectData({ ...projectData, [field]: value })
  }

  return (
    <div className="project-builder">
      <div className="builder-header">
        <h1>🛠️ Создать свой проект</h1>
        <p>Настрой проект с нуля, выбери методологию и параметры</p>
      </div>

      <div className="builder-container">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className={`progress-line ${step >= 4 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
        </div>

        <div className="builder-content">
          {step === 1 && (
            <ProjectStep1 
              data={projectData}
              onChange={handleChange}
            />
          )}
          {step === 2 && (
            <ProjectStep2 
              data={projectData}
              onChange={handleChange}
              methodologies={methodologies}
            />
          )}
          {step === 3 && (
            <ProjectStep3 
              data={projectData}
              onChange={handleChange}
              teamSizes={teamSizes}
              durations={durations}
            />
          )}
          {step === 4 && (
            <ProjectStep4 
              data={projectData}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="builder-actions">
          {step > 1 && (
            <button className="btn btn-secondary" onClick={handleBack}>
              Назад
            </button>
          )}
          <button className="btn btn-primary" onClick={handleNext}>
            {step === 4 ? 'Создать проект' : 'Далее'}
          </button>
        </div>
      </div>

      {showDialog && (
        <ProjectSummaryDialog 
          projectData={projectData}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  )
}

function ProjectStep1({ data, onChange }) {
  return (
    <div className="step-content">
      <h2>Шаг 1: Основная информация</h2>
      <div className="form-group">
        <label>Название проекта</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Введите название проекта"
        />
      </div>
      <div className="form-group">
        <label>Описание проекта</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Опишите ваш проект"
          rows="5"
        />
      </div>
    </div>
  )
}

function ProjectStep2({ data, onChange, methodologies }) {
  return (
    <div className="step-content">
      <h2>Шаг 2: Выбери методологию</h2>
      <div className="methodology-selector">
        {methodologies.map(method => (
          <div
            key={method}
            className={`methodology-option ${data.methodology === method ? 'selected' : ''}`}
            onClick={() => onChange('methodology', method)}
          >
            <div className="option-icon">
              {method === 'Agile' && '🔄'}
              {method === 'Scrum' && '⚡'}
              {method === 'Kanban' && '📋'}
              {method === 'Scrumban' && '🔀'}
              {method === 'Waterfall' && '💧'}
            </div>
            <div className="option-name">{method}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectStep3({ data, onChange, teamSizes, durations }) {
  return (
    <div className="step-content">
      <h2>Шаг 3: Параметры проекта</h2>
      <div className="form-group">
        <label>Размер команды</label>
        <div className="radio-group">
          {teamSizes.map(size => (
            <label key={size} className="radio-option">
              <input
                type="radio"
                name="teamSize"
                value={size}
                checked={data.teamSize === size}
                onChange={(e) => onChange('teamSize', e.target.value)}
              />
              <span>{size} человек</span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Длительность проекта</label>
        <div className="radio-group">
          {durations.map(duration => (
            <label key={duration} className="radio-option">
              <input
                type="radio"
                name="duration"
                value={duration}
                checked={data.duration === duration}
                onChange={(e) => onChange('duration', e.target.value)}
              />
              <span>{duration}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectStep4({ data, onChange }) {
  const [newFeature, setNewFeature] = useState('')

  const addFeature = () => {
    if (newFeature.trim()) {
      onChange('features', [...data.features, newFeature])
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    onChange('features', data.features.filter((_, i) => i !== index))
  }

  return (
    <div className="step-content">
      <h2>Шаг 4: Ключевые фичи</h2>
      <div className="form-group">
        <label>Добавить фичу</label>
        <div className="feature-input">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Введите название фичи"
            onKeyPress={(e) => e.key === 'Enter' && addFeature()}
          />
          <button onClick={addFeature}>Добавить</button>
        </div>
      </div>
      <div className="features-list">
        {data.features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span>{feature}</span>
            <button onClick={() => removeFeature(index)}>×</button>
          </div>
        ))}
        {data.features.length === 0 && (
          <p className="empty-state">Пока нет фич. Добавьте первую!</p>
        )}
      </div>
    </div>
  )
}

function ProjectSummaryDialog({ projectData, onClose }) {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content summary-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>🎉 Проект создан!</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="dialog-body">
          <div className="summary-section">
            <h3>Основная информация</h3>
            <p><strong>Название:</strong> {projectData.name || 'Не указано'}</p>
            <p><strong>Описание:</strong> {projectData.description || 'Не указано'}</p>
          </div>
          <div className="summary-section">
            <h3>Методология</h3>
            <p>{projectData.methodology || 'Не выбрана'}</p>
          </div>
          <div className="summary-section">
            <h3>Параметры</h3>
            <p><strong>Команда:</strong> {projectData.teamSize || 'Не указано'}</p>
            <p><strong>Длительность:</strong> {projectData.duration || 'Не указано'}</p>
          </div>
          <div className="summary-section">
            <h3>Фичи ({projectData.features.length})</h3>
            {projectData.features.length > 0 ? (
              <ul>
                {projectData.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p>Нет фич</p>
            )}
          </div>
          <div className="dialog-actions">
            <button className="btn btn-primary" onClick={onClose}>
              Отлично!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectBuilder

