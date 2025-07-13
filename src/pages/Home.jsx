import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

function Home({ projects, setProjects, theme, setTheme }) {
  const navigate = useNavigate();

  // 📅 今日の日付（YYYY-MM-DD）
  const today = new Date().toISOString().split('T')[0];

  // 🔍 全プロジェクトから今日のタスクを抽出
  const todaysTasks = [];
  projects.forEach(project => {
    project.todos.forEach(todo => {
      if (todo.executionDate === today) {
        todaysTasks.push({
          projectTitle: project.title,
          taskText: todo.text,
          done: todo.done
        });
      }
    });
  });

  const handleAddProject = () => {
    const title = prompt('プロジェクト名を入力してください');
    if (title) {
      const newProject = {
        id: Date.now().toString(),
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
    <div className="home-container">

      {/* 📅 今日やること一覧 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '8px' }}>📅 今日やること</h2>
        {todaysTasks.length === 0 ? (
          <p>今日はやることが登録されていません。</p>
        ) : (
          <ul style={{ paddingLeft: '20px' }}>
            {todaysTasks.map((task, index) => (
              <li key={index}>
                {task.projectTitle}：{task.taskText} {task.done && '✅'}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* プロジェクト一覧 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <h2 style={{ margin: 0 }}>📁 プロジェクト一覧</h2>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="テーマ切り替え"
          style={{
            fontSize: '20px',
            marginLeft: '12px',
            background: 'transparent',
            border: 'none',
            color: theme === 'light' ? 'black' : 'white',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
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
  );
}

export default Home;
