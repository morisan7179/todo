import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProjectDetail({ projects, setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = Number(id);

  const project = projects.find(p => p.id === projectId);
  if (!project) return <p>プロジェクトが見つかりません</p>;

  const [editingId, setEditingId] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');

  const handleAdd = () => {
    if (newTaskText && newTaskDate) {
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            todos: [
              ...p.todos,
              {
                id: Date.now(),
                text: newTaskText,
                executionDate: newTaskDate,
                done: false,
              },
            ],
          };
        }
        return p;
      });
      setProjects(updatedProjects);
      setNewTaskText('');
      setNewTaskDate('');
    } else {
      alert('タスク名と実行日を入力してください');
    }
  };

  const toggleDone = (todoId) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          todos: p.todos.map(todo =>
            todo.id === todoId ? { ...todo, done: !todo.done } : todo
          )
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const handleDelete = (todoId) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          todos: p.todos.filter(todo => todo.id !== todoId)
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const handleChangeText = (todoId, newText) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          todos: p.todos.map(todo =>
            todo.id === todoId ? { ...todo, text: newText } : todo
          )
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const handleChangeDate = (todoId, newDate) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          todos: p.todos.map(todo =>
            todo.id === todoId ? { ...todo, executionDate: newDate } : todo
          )
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  const iconButtonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'inherit',
    padding: '4px'
  };

  return (
    <div className="project-detail">
      <button className="back-button button" onClick={() => navigate('/')}>
        ← ホームに戻る
      </button>

      <h2>📝 {project.title}</h2>

      {/* タスク入力フォーム */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="タスク名"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          style={{ padding: '4px', flexGrow: 1 }}
        />
        <input
          type="date"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
          style={{ padding: '4px' }}
        />
        <button className="button" onClick={handleAdd}>＋ タスク追加</button>
      </div>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {project.todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              flexWrap: 'wrap'
            }}
            className="task-item"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo.id)}
            />

            {editingId === todo.id ? (
              <input
                type="text"
                value={todo.text}
                autoFocus
                onChange={(e) => handleChangeText(todo.id, e.target.value)}
                onBlur={() => setEditingId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingId(null);
                }}
                style={{ flexGrow: 1, padding: '4px' }}
              />
            ) : (
              <span
                onClick={() => setEditingId(todo.id)}
                className="task-text"
                style={{
                  textDecoration: todo.done ? 'line-through' : 'none',
                  marginLeft: '8px',
                  cursor: 'pointer',
                  flexGrow: 1
                }}
              >
                {todo.text}
              </span>
            )}

            <input
              type="date"
              value={todo.executionDate || ''}
              onChange={(e) => handleChangeDate(todo.id, e.target.value)}
              style={{ padding: '4px' }}
            />

            <button onClick={() => handleDelete(todo.id)} style={iconButtonStyle}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetail;
