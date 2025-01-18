import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || (!isLogin && !email)) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin && !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (isLogin) {
      // Check local storage for existing user
      const storedUser = localStorage.getItem(username);
      if (!storedUser || JSON.parse(storedUser).password !== password) {
        setError('Invalid username or password');
        return;
      }

      const user = JSON.parse(storedUser);
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        createdAt: user.createdAt
      }));
    } else {
      // Register new user
      if (localStorage.getItem(username)) {
        setError('Username already exists');
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        username,
        email,
        password,
        balance: 0,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(username, JSON.stringify(newUser));
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        balance: newUser.balance,
        createdAt: newUser.createdAt
      }));
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          <p className="text-center text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-500 hover:text-purple-400"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;