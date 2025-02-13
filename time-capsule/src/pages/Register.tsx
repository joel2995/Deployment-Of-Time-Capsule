import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../const/const'; // Update this import

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    className="toast-container"
  >
    <div className={`toast ${type}`}>
      {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="toast-close" aria-label="Close">×</button>
    </div>
  </motion.div>
);

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
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
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setToast({
        message: 'Registration Successful! Redirecting to Login...',
        type: 'success'
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setToast({
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || 'Registration Failed'
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
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-md p-8 rounded-xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
      >
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
        >
          <User size={24} className="text-cyan-400" />
          Create Your Account
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input 
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={30}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-cyan-500/20 
              text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-cyan-500/20 
              text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
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
              minLength={6}
              className="w-full pl-10 pr-12 py-2 rounded-lg bg-black/50 border border-cyan-500/20 
              text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 
              hover:text-cyan-300 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff size={18} className="opacity-75 hover:opacity-100" />
              ) : (
                <Eye size={18} className="opacity-75 hover:opacity-100" />
              )}
            </button>
          </div>

          <motion.button 
            type="submit"
            className="btn btn-primary w-full"
            whileHover={{ scale: !isLoading ? 1.02 : 1 }}
            whileTap={{ scale: !isLoading ? 0.98 : 1 }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </motion.button>
          <div className="login-link">
            Already have an account? 
            <Link to="/login" className="link">
              Login
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

export default RegistrationForm;