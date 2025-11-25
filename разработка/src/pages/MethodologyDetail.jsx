import { useParams, Link } from 'react-router-dom'
import './MethodologyDetail.css'

const methodologyData = {
  agile: {
    name: 'Agile',
    icon: '🔄',
    description: 'Гибкая методология разработки, основанная на итерациях и обратной связи',
    values: [
      'Люди и взаимодействие важнее процессов и инструментов',
      'Работающий продукт важнее исчерпывающей документации',
      'Сотрудничество с заказчиком важнее согласования условий',
      'Готовность к изменениям важнее следования плану'
    ],
    principles: [
      'Удовлетворение клиента через раннюю поставку',
      'Приветствие изменений требований',
      'Частая поставка работающего ПО',
      'Ежедневное сотрудничество',
      'Проекты строятся вокруг мотивированных людей'
    ],
    practices: ['Scrum', 'Kanban', 'Extreme Programming', 'Lean Development']
  },
  scrum: {
    name: 'Scrum',
    icon: '⚡',
    description: 'Фреймворк для разработки, доставки и поддержки сложных продуктов',
    roles: [
      { name: 'Product Owner', desc: 'Управляет Product Backlog, определяет приоритеты' },
      { name: 'Scrum Master', desc: 'Обеспечивает понимание Scrum, устраняет препятствия' },
      { name: 'Development Team', desc: 'Самоорганизующаяся команда 3-9 человек' }
    ],
    events: [
      'Sprint - фиксированный период (1-4 недели)',
      'Sprint Planning - планирование работы',
      'Daily Scrum - ежедневная встреча на 15 минут',
      'Sprint Review - демонстрация работы',
      'Sprint Retrospective - анализ процесса'
    ],
    artifacts: ['Product Backlog', 'Sprint Backlog', 'Increment']
  },
  kanban: {
    name: 'Kanban',
    icon: '📋',
    description: 'Метод управления работой, визуализирующий поток задач',
    principles: [
      'Визуализация работы',
      'Ограничение работы в процессе (WIP)',
      'Управление потоком',
      'Явные правила процесса',
      'Улучшение через обратную связь'
    ],
    metrics: ['Lead Time', 'Cycle Time', 'Throughput']
  },
  scrumban: {
    name: 'Scrumban',
    icon: '🔀',
    description: 'Гибридная методология, объединяющая структуру Scrum с гибкостью Kanban',
    elements: {
      fromScrum: ['Sprint Planning', 'Sprint Review', 'Retrospective', 'Product Owner'],
      fromKanban: ['Kanban Board', 'WIP Limits', 'Фокус на потоке', 'Pull-система']
    }
  },
  waterfall: {
    name: 'Waterfall',
    icon: '💧',
    description: 'Линейная последовательная модель разработки',
    stages: [
      'Требования (Requirements)',
      'Дизайн (Design)',
      'Реализация (Implementation)',
      'Тестирование (Verification)',
      'Развертывание (Deployment)',
      'Поддержка (Maintenance)'
    ],
    characteristics: ['Последовательность', 'Документация', 'Контроль', 'Предсказуемость']
  },
  safe: {
    name: 'SAFe',
    icon: '🏢',
    description: 'Фреймворк для масштабирования Agile практик на уровень всей организации',
    levels: ['Team Level', 'Program Level', 'Portfolio Level'],
    concepts: ['Agile Release Train (ART)', 'Program Increment (PI)', 'Features']
  }
}

function MethodologyDetail() {
  const { id } = useParams()
  const methodology = methodologyData[id]

  if (!methodology) {
    return (
      <div className="methodology-detail">
        <div className="error-state">
          <h2>Методология не найдена</h2>
          <Link to="/learning">Вернуться к обучению</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="methodology-detail">
      <Link to="/learning" className="back-link">← Назад к обучению</Link>
      
      <div className="methodology-header">
        <div className="methodology-icon-large">{methodology.icon}</div>
        <h1>{methodology.name}</h1>
        <p className="methodology-description">{methodology.description}</p>
      </div>

      <div className="methodology-content">
        {methodology.values && (
          <section className="content-section">
            <h2>4 ценности Agile</h2>
            <ul className="values-list">
              {methodology.values.map((value, i) => (
                <li key={i}>{value}</li>
              ))}
            </ul>
          </section>
        )}

        {methodology.principles && (
          <section className="content-section">
            <h2>Принципы</h2>
            <ul className="principles-list">
              {methodology.principles.map((principle, i) => (
                <li key={i}>{principle}</li>
              ))}
            </ul>
          </section>
        )}

        {methodology.roles && (
          <section className="content-section">
            <h2>Роли</h2>
            <div className="roles-grid">
              {methodology.roles.map((role, i) => (
                <div key={i} className="role-card">
                  <h3>{role.name}</h3>
                  <p>{role.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {methodology.events && (
          <section className="content-section">
            <h2>События</h2>
            <ul className="events-list">
              {methodology.events.map((event, i) => (
                <li key={i}>{event}</li>
              ))}
            </ul>
          </section>
        )}

        {methodology.artifacts && (
          <section className="content-section">
            <h2>Артефакты</h2>
            <div className="artifacts-grid">
              {methodology.artifacts.map((artifact, i) => (
                <div key={i} className="artifact-card">
                  {artifact}
                </div>
              ))}
            </div>
          </section>
        )}

        {methodology.stages && (
          <section className="content-section">
            <h2>Этапы</h2>
            <div className="stages-timeline">
              {methodology.stages.map((stage, i) => (
                <div key={i} className="stage-item">
                  <div className="stage-number">{i + 1}</div>
                  <div className="stage-name">{stage}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {methodology.elements && (
          <section className="content-section">
            <h2>Элементы методологии</h2>
            <div className="elements-grid">
              <div className="element-group">
                <h3>Из Scrum</h3>
                <ul>
                  {methodology.elements.fromScrum.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="element-group">
                <h3>Из Kanban</h3>
                <ul>
                  {methodology.elements.fromKanban.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {methodology.levels && (
          <section className="content-section">
            <h2>Уровни SAFe</h2>
            <div className="levels-list">
              {methodology.levels.map((level, i) => (
                <div key={i} className="level-item">
                  {level}
                </div>
              ))}
            </div>
          </section>
        )}

        {methodology.concepts && (
          <section className="content-section">
            <h2>Ключевые концепции</h2>
            <div className="concepts-grid">
              {methodology.concepts.map((concept, i) => (
                <div key={i} className="concept-card">
                  {concept}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default MethodologyDetail

