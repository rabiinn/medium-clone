import { useState } from 'react';
import authService from '../services/authService.js';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      await authService.register({
        name,
        email,
        username,
        password,
      });
      console.log(`User registered`);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 p-8 bg-white rounded shadow"
      onSubmit={handleRegistration}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Name</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Username</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Password</label>
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
