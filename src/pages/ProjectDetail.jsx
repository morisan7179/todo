import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProjectDetail({ projects, setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = Number(id);

  const project = projects.find(p => p.id === projectId);
  if (!project) return <p>プロジェクトが見つかりません</p>;

  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    const text = prompt('タスクを入力してください');
    if (text) {
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            todos: [...p.todos, { id: Date.now(), text, done: false }]
          };
        }
        return p;
      });
      setProjects(updatedProjects);
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

  const iconButtonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'inherit', // ← テーマに合わせて変化
    padding: '4px'
  };

  return (
    <div className="project-detail">
      <button className="back-button button" onClick={() => navigate('/')}>
        ← ホームに戻る
      </button>

      <h2>📝 {project.title}</h2>
      <button className="button" onClick={handleAdd}>＋ タスク追加</button>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {project.todos.map(todo => (
          <li
            key={todo.id}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
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

            <button onClick={() => handleDelete(todo.id)} style={iconButtonStyle}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetail;
