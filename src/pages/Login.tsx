import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic - in real app, this would authenticate with backend
    console.log('Login attempt:', formData);
    
    // Redirect to librarian dashboard for demo
    navigate('/librarian-dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout showBackButton backTo="/">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">Access your library account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-900 transition-colors"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/forgot-password" className="text-gray-600 hover:text-gray-900 text-sm">
              Forgot your password?
            </Link>
            
            <div className="mt-4 text-gray-600 text-sm">
              Don't have an account?
            </div>
            
            <Link to="/register" className="text-gray-900 font-medium hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;