import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../const/const'; // Update this import

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    email: string;
    username: string;
    id: string;
  };
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    className="fixed top-4 right-4 z-50"
  >
    <div className={`flex items-center p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="ml-2">{message}</span>
      <button onClick={onClose} className="ml-auto text-lg font-bold" aria-label="Close">
        ×
      </button>
    </div>
  </motion.div>
);

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/auth/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const { token, user } = response.data;

      // Store authentication data
      localStorage.setItem('token', token);
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('email', user.email);
      }

      setToast({
        message: 'Login Successful! Redirecting to Dashboard...',
        type: 'success'
      });

      // Redirect after showing success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setToast({
        message: axios.isAxiosError(error) 
          ? error.response?.data?.message || 'Login Failed'
          : 'Network error. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-md p-8 rounded-xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-2 rounded-lg bg-black/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff size={18} className="opacity-75 hover:opacity-100" />
              ) : (
                <Eye size={18} className="opacity-75 hover:opacity-100" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-cyan-300">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="form-checkbox text-cyan-500 focus:ring-cyan-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Forgot Password?
            </Link>
          </div>
          <motion.button 
            type="submit"
            className="w-full py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40"
            whileHover={{ scale: !isLoading ? 1.02 : 1 }}
            whileTap={{ scale: !isLoading ? 0.98 : 1 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </motion.button>
          <div className="text-center text-cyan-300">
            Don't have an account? 
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1">
              Sign Up
            </Link>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginForm;