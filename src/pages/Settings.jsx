import React from 'react';
import { useNavigate } from 'react-router-dom';

function Settings({ setTheme }) {
  const navigate = useNavigate();
  const themes = ['dark', 'light', 'blue', 'green', 'orange', 'pink'];

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => navigate('/')}
        className="back-button button"
        style={{ marginBottom: '20px' }}
      >
        ← ホームに戻る
      </button>

      <h2>🎨 テーマ設定</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {themes.map((themeName) => (
          <li key={themeName} style={{ marginBottom: '12px' }}>
            <button
              onClick={() => setTheme(themeName)}
              style={{
                padding: '10px 16px',
                cursor: 'pointer',
                backgroundColor: themeName === 'light' ? '#f4f4f4' : themeName,
                border: 'none',
                borderRadius: '6px',
                color: themeName === 'light' ? '#000' : '#fff',
                fontWeight: 'bold',
              }}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)} モード
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Settings;
