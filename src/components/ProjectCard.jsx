import { Link } from 'react-router-dom';

function ProjectCard({ title, todos, id, onDelete, onEditTitle }) {
  const incompleteCount = todos.filter(todo => !todo.done).length;

  return (
    <div className="project-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>
            <Link to={`/project/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {title}
            </Link>
          </h3>
          <p>未完了タスク: {incompleteCount}件</p>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button onClick={() => onEditTitle(id)} style={iconButtonStyle}>✏️</button>
          <button onClick={() => onDelete(id)} style={iconButtonStyle}>🗑</button>
        </div>
      </div>
    </div>
  );
}

const iconButtonStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  color: 'white',
  padding: '4px'
};

export default ProjectCard;
