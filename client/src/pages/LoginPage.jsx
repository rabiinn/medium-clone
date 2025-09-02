import LoginForm from '../components/LoginForm';
const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
