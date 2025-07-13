import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  const [theme, setTheme] = useState('dark'); // テーマ状態

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'ブログ執筆',
      todos: [
        { id: 1, text: 'タイトル決め', done: false  },
        { id: 2, text: '本文執筆', done: true },
        { id: 3, text: '画像探し', done: false  }
      ]
    },
    {
      id: 2,
      title: '新商品開発',
      todos: [
        { id: 1, text: '企画書作成', done: false  },
        { id: 2, text: '市場調査', done: false  }
      ]
    }
  ]);

  // ✅ 初回ロード時に保存された projects を読み込む
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // ✅ projects が変更されるたびに保存する
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // ✅ 保存されたテーマを読み込む（初回）
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // ✅ テーマが変わるたびに保存
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                projects={projects}
                setProjects={setProjects}
                theme={theme}
                setTheme={setTheme}
              />
            }
          />
          <Route
            path="/project/:id"
            element={<ProjectDetail projects={projects} setProjects={setProjects} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
