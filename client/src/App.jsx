import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import RegisterPage from './pages/RegisterPage';
const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Link to="/login">Login</Link>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/profile/:username' element={<ProfilePage/>}/>
          <Route path='/article/:slug' element={<ArticlePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;