import { useState, useEffect } from 'react'
import './Matrices.css'

const matrices = [
  {
    id: 'stakeholder',
    name: 'Матрица стейкхолдеров',
    description: 'Анализ заинтересованных сторон по влиянию и интересу',
    type: 'quadrant',
    axes: { x: 'Интерес', y: 'Влияние' },
    quadrants: [
      { id: 'q1', name: 'Manage Closely', desc: 'Высокое влияние + Высокий интерес', color: '#ef4444', x: 'high', y: 'high' },
      { id: 'q2', name: 'Keep Satisfied', desc: 'Высокое влияние + Низкий интерес', color: '#f59e0b', x: 'low', y: 'high' },
      { id: 'q3', name: 'Keep Informed', desc: 'Низкое влияние + Высокий интерес', color: '#3b82f6', x: 'high', y: 'low' },
      { id: 'q4', name: 'Monitor', desc: 'Низкое влияние + Низкий интерес', color: '#10b981', x: 'low', y: 'low' }
    ]
  },
  {
    id: 'raci',
    name: 'RACI матрица',
    description: 'Определение ролей и ответственности в проекте',
    type: 'table',
    roles: ['R - Responsible', 'A - Accountable', 'C - Consulted', 'I - Informed']
  },
  {
    id: 'priority',
    name: 'Матрица приоритетов',
    description: 'Определение приоритетов задач (MoSCoW)',
    type: 'categories',
    categories: [
      { id: 'must', name: 'Must Have', desc: 'Обязательно', color: '#ef4444' },
      { id: 'should', name: 'Should Have', desc: 'Желательно', color: '#f59e0b' },
      { id: 'could', name: 'Could Have', desc: 'Можно', color: '#3b82f6' },
      { id: 'wont', name: "Won't Have", desc: 'Не будем делать', color: '#9ca3af' }
    ]
  },
  {
    id: 'risk',
    name: 'Матрица рисков',
    description: 'Оценка и приоритизация рисков проекта',
    type: 'matrix',
    axes: { x: 'Вероятность', y: 'Воздействие' },
    levels: [
      { id: 'critical', name: 'Критический', desc: 'Высокая вероятность + Высокое влияние', color: '#ef4444', x: 'high', y: 'high' },
      { id: 'high', name: 'Высокий', desc: 'Требует внимания', color: '#f59e0b', x: 'medium', y: 'high' },
      { id: 'medium', name: 'Средний', desc: 'Отслеживать', color: '#fbbf24', x: 'medium', y: 'medium' },
      { id: 'low', name: 'Низкий', desc: 'Минимальное внимание', color: '#10b981', x: 'low', y: 'low' }
    ]
  },
  {
    id: 'impact-effort',
    name: 'Impact/Effort матрица',
    description: 'Оценка задач по влиянию и усилиям',
    type: 'quadrant',
    axes: { x: 'Усилия', y: 'Влияние' },
    quadrants: [
      { id: 'q1', name: 'Quick Wins', desc: 'Высокое влияние + Низкие усилия', color: '#10b981', x: 'low', y: 'high' },
      { id: 'q2', name: 'Major Projects', desc: 'Высокое влияние + Высокие усилия', color: '#3b82f6', x: 'high', y: 'high' },
      { id: 'q3', name: 'Fill-ins', desc: 'Низкое влияние + Низкие усилия', color: '#f59e0b', x: 'low', y: 'low' },
      { id: 'q4', name: 'Time Sinks', desc: 'Низкое влияние + Высокие усилия', color: '#ef4444', x: 'high', y: 'low' }
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
          onClose={() => {
            setShowBuilder(false)
            setSelectedMatrix(null)
          }}
          matrix={matrices.find(m => m.id === selectedMatrix)}
        />
      )}
    </div>
  )
}

function MatrixBuilderDialog({ onClose, matrix }) {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState({ name: '', quadrant: '', notes: '' })
  const [editingIndex, setEditingIndex] = useState(null)

  useEffect(() => {
    if (matrix) {
      const saved = localStorage.getItem(`matrix_${matrix.id}`)
      if (saved) {
        try {
          setItems(JSON.parse(saved))
        } catch (e) {
          console.error('Error loading matrix data:', e)
          setItems([])
        }
      } else {
        setItems([])
      }
    }
  }, [matrix])

  useEffect(() => {
    if (matrix) {
      localStorage.setItem(`matrix_${matrix.id}`, JSON.stringify(items))
    }
  }, [items, matrix])

  if (!matrix) return null

  const handleAdd = () => {
    if (newItem.name.trim()) {
      if (editingIndex !== null) {
        const updated = [...items]
        updated[editingIndex] = { ...newItem, id: items[editingIndex].id || Date.now() }
        setItems(updated)
        setEditingIndex(null)
      } else {
        setItems([...items, { ...newItem, id: Date.now() }])
      }
      setNewItem({ name: '', quadrant: '', notes: '' })
    }
  }

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleEdit = (index) => {
    setNewItem(items[index])
    setEditingIndex(index)
  }

  const handleExport = () => {
    const data = {
      matrix: matrix.name,
      date: new Date().toLocaleDateString(),
      items: items
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${matrix.id}_${Date.now()}.json`
    a.click()
  }

  const handleClear = () => {
    if (window.confirm('Очистить все записи?')) {
      setItems([])
      localStorage.removeItem(`matrix_${matrix.id}`)
    }
  }

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content matrix-builder" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{matrix.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="dialog-body">
          <div className="matrix-builder-content">
            {matrix.type === 'quadrant' && (
              <QuadrantMatrix 
                matrix={matrix}
                items={items}
                onItemChange={(id, quadrant) => {
                  setItems(items.map(item => 
                    item.id === id ? { ...item, quadrant } : item
                  ))
                }}
              />
            )}
            {matrix.type === 'categories' && (
              <CategoriesMatrix 
                matrix={matrix}
                items={items}
                onItemChange={(id, category) => {
                  setItems(items.map(item => 
                    item.id === id ? { ...item, quadrant: category } : item
                  ))
                }}
              />
            )}
            {matrix.type === 'table' && (
              <RACIMatrix 
                matrix={matrix}
                items={items}
                setItems={setItems}
              />
            )}
            {matrix.type === 'matrix' && (
              <RiskMatrix 
                matrix={matrix}
                items={items}
                onItemChange={(id, level) => {
                  setItems(items.map(item => 
                    item.id === id ? { ...item, quadrant: level } : item
                  ))
                }}
              />
            )}

            <div className="matrix-form">
              <h3>{editingIndex !== null ? 'Редактировать' : 'Добавить элемент'}</h3>
              <input
                type="text"
                placeholder="Название"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              {matrix.type !== 'table' && (
                <select
                  value={newItem.quadrant}
                  onChange={(e) => setNewItem({ ...newItem, quadrant: e.target.value })}
                >
                  <option value="">Выберите категорию</option>
                  {matrix.quadrants?.map(q => (
                    <option key={q.id} value={q.id}>{q.name}</option>
                  ))}
                  {matrix.categories?.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                  {matrix.levels?.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              )}
              <textarea
                placeholder="Заметки (опционально)"
                value={newItem.notes}
                onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                rows="2"
              />
              <div className="form-actions">
                <button onClick={handleAdd} className="btn btn-primary">
                  {editingIndex !== null ? 'Сохранить' : 'Добавить'}
                </button>
                {editingIndex !== null && (
                  <button onClick={() => {
                    setNewItem({ name: '', quadrant: '', notes: '' })
                    setEditingIndex(null)
                  }} className="btn btn-secondary">
                    Отмена
                  </button>
                )}
              </div>
            </div>

            <div className="matrix-items-list">
              <h3>Элементы ({items.length})</h3>
              {items.length === 0 ? (
                <p className="empty-state">Нет элементов. Добавьте первый!</p>
              ) : (
                <div className="items-list">
                  {items.map((item, index) => {
                    const category = matrix.quadrants?.find(q => q.id === item.quadrant) ||
                                    matrix.categories?.find(c => c.id === item.quadrant) ||
                                    matrix.levels?.find(l => l.id === item.quadrant)
                    return (
                      <div key={item.id} className="matrix-item" style={{ borderLeft: `4px solid ${category?.color || '#ccc'}` }}>
                        <div className="item-content">
                          <strong>{item.name}</strong>
                          {category && <span className="item-category">{category.name}</span>}
                          {item.notes && <p className="item-notes">{item.notes}</p>}
                        </div>
                        <div className="item-actions">
                          <button onClick={() => handleEdit(index)} className="edit-btn">✏️</button>
                          <button onClick={() => handleDelete(item.id)} className="delete-btn">🗑️</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="matrix-actions">
              <button onClick={handleExport} className="btn btn-secondary">Экспорт JSON</button>
              {items.length > 0 && (
                <button onClick={handleClear} className="btn btn-danger">Очистить все</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuadrantMatrix({ matrix, items, onItemChange }) {
  return (
    <div className="quadrant-matrix">
      <div className="matrix-axis-label y-axis">{matrix.axes.y}</div>
      <div className="matrix-container">
        <div className="matrix-grid-2x2">
          {matrix.quadrants.map(q => {
            const quadrantItems = items.filter(item => item.quadrant === q.id)
            return (
              <div key={q.id} className="quadrant-cell" style={{ borderColor: q.color }}>
                <div className="quadrant-header" style={{ background: q.color + '20' }}>
                  <strong>{q.name}</strong>
                  <span className="item-count">{quadrantItems.length}</span>
                </div>
                <div className="quadrant-items">
                  {quadrantItems.map(item => (
                    <div key={item.id} className="quadrant-item" title={item.notes || item.name}>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div className="matrix-axis-label x-axis">{matrix.axes.x}</div>
      </div>
    </div>
  )
}

function CategoriesMatrix({ matrix, items, onItemChange }) {
  return (
    <div className="categories-matrix">
      {matrix.categories.map(cat => {
        const categoryItems = items.filter(item => item.quadrant === cat.id)
        return (
          <div key={cat.id} className="category-column" style={{ borderTop: `4px solid ${cat.color}` }}>
            <div className="category-header">
              <strong>{cat.name}</strong>
              <span className="item-count">{categoryItems.length}</span>
            </div>
            <div className="category-items">
              {categoryItems.map(item => (
                <div key={item.id} className="category-item" title={item.notes || item.name}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function RACIMatrix({ matrix, items, setItems }) {
  const [tasks, setTasks] = useState([])
  const [roles, setRoles] = useState([])
  const [newTask, setNewTask] = useState('')
  const [newRole, setNewRole] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(`raci_tasks_${matrix.id}`)
    if (saved) {
      const data = JSON.parse(saved)
      setTasks(data.tasks || [])
      setRoles(data.roles || [])
    }
  }, [matrix.id])

  useEffect(() => {
    if (tasks.length > 0 || roles.length > 0) {
      localStorage.setItem(`raci_tasks_${matrix.id}`, JSON.stringify({ tasks, roles }))
    }
  }, [tasks, roles, matrix.id])

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask, assignments: {} }])
      setNewTask('')
    }
  }

  const addRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, { id: Date.now(), name: newRole }])
      setNewRole('')
    }
  }

  const toggleAssignment = (taskId, roleId, value) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const assignments = { ...task.assignments }
        if (assignments[roleId] === value) {
          delete assignments[roleId]
        } else {
          assignments[roleId] = value
        }
        return { ...task, assignments }
      }
      return task
    }))
  }

  return (
    <div className="raci-matrix">
      <div className="raci-controls">
        <div className="raci-input-group">
          <input
            type="text"
            placeholder="Добавить задачу"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>+</button>
        </div>
        <div className="raci-input-group">
          <input
            type="text"
            placeholder="Добавить роль"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addRole()}
          />
          <button onClick={addRole}>+</button>
        </div>
      </div>
      <div className="raci-table-container">
        <table className="raci-table">
          <thead>
            <tr>
              <th>Задача</th>
              {roles.map(role => (
                <th key={role.id}>{role.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.name}</td>
                {roles.map(role => (
                  <td key={role.id} className="raci-cell">
                    {['R', 'A', 'C', 'I'].map(letter => (
                      <button
                        key={letter}
                        className={`raci-btn ${task.assignments[role.id] === letter ? 'active' : ''}`}
                        onClick={() => toggleAssignment(task.id, role.id, letter)}
                      >
                        {letter}
                      </button>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RiskMatrix({ matrix, items, onItemChange }) {
  return (
    <div className="risk-matrix">
      <div className="matrix-axis-label y-axis">{matrix.axes.y}</div>
      <div className="matrix-container">
        <div className="risk-grid">
          {['high', 'medium', 'low'].map(y => (
            ['high', 'medium', 'low'].map(x => {
              const level = matrix.levels.find(l => l.x === x && l.y === y) || matrix.levels[0]
              const levelItems = items.filter(item => {
                const itemLevel = matrix.levels.find(l => l.id === item.quadrant)
                return itemLevel?.x === x && itemLevel?.y === y
              })
              return (
                <div key={`${x}-${y}`} className="risk-cell" style={{ borderColor: level.color }}>
                  <div className="risk-header" style={{ background: level.color + '20' }}>
                    <strong>{level.name}</strong>
                    <span className="item-count">{levelItems.length}</span>
                  </div>
                  <div className="risk-items">
                    {levelItems.map(item => (
                      <div key={item.id} className="risk-item" title={item.notes || item.name}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          ))}
        </div>
        <div className="matrix-axis-label x-axis">{matrix.axes.x}</div>
      </div>
    </div>
  )
}

export default Matrices
