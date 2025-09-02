import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect, useState } from 'react';
import authService from './services/authService.js';
import NavBar from './components/NavBar.jsx';
import CreateArticlePage from './pages/CreateArticlePage.jsx';
import articleService from './services/articleService.js';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const onLogin = async ({ username, password }) => {
    try {
      const res = await authService.login({ username, password });
      console.log(`${res.username} logged in`);
      localStorage.setItem('username', res.username);
      localStorage.setItem('token', res.token);
    } catch (error) {
      console.log(`Error while logging in`, error);
    }
  };

  const onLogout = async () => {
    setUser(null);
    localStorage.clear();
  };

  const handleCreateArticle = async (articleData) => {
    const token = localStorage.getItem('token');
    const created = await articleService.createArticle(articleData, token);
    return created;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route
              path="/write"
              element={<CreateArticlePage onSubmit={handleCreateArticle} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
