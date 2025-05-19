import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

function Home({ projects, setProjects }) {
  const navigate = useNavigate();

  const handleAddProject = () => {
    const title = prompt('プロジェクト名を入力してください');
    if (title) {
      const newProject = {
        id: Date.now(),
        title,
        todos: []
      };
      setProjects([...projects, newProject]);
    }
  };

  const handleDeleteProject = (id) => {
    const confirmed = window.confirm('このプロジェクトを削除しますか？');
    if (confirmed) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
    }
  };

  const handleEditProjectTitle = (id) => {
    const newTitle = prompt('新しいプロジェクト名を入力してください');
    if (newTitle && newTitle.trim() !== '') {
      const updated = projects.map(p =>
        p.id === id ? { ...p, title: newTitle } : p
      );
      setProjects(updated);
    }
  };

  return (
  <>
    <button
      onClick={() => navigate('/settings')}
      className="settings-icon"
      title="設定"
    >
      ⚙
    </button>

    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📁 プロジェクト一覧</h2>
      </div>

      <button onClick={handleAddProject} className="button">
        ＋ プロジェクト追加
      </button>

      <div className="project-list">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            todos={project.todos}
            onDelete={handleDeleteProject}
            onEditTitle={handleEditProjectTitle}
          />
        ))}
      </div>
    </div>
  </>
);
}

export default Home;
