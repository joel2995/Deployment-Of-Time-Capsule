import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, TimerIcon, Menu, X, Share2, Grid, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import "./Navbar.css";

// Add these types if needed
interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  text: string;
}

// Add NavLink component definition at the top level
const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className="px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
      text-cyan-400 hover:text-cyan-300 transition-all duration-300
      border border-cyan-500/20 hover:border-cyan-500/40 flex items-center gap-2"
    >
      {icon}
      <span>{text}</span>
    </Link>
  </motion.div>
);

// Add MobileNavLink component definition
const MobileNavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="block px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
    text-cyan-400 hover:text-cyan-300 transition-all duration-300
    border border-cyan-500/20 hover:border-cyan-500/40 flex items-center gap-2"
    onClick={() => document.body.style.overflow = 'auto'}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsMenuOpen(false);
    navigate('/login', { replace: true });
  }, [navigate]);

  // Conditionally render theme toggle
  const shouldShowThemeToggle = location.pathname !== '/dashboard';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-lg bg-black/30 border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <TimerIcon className="h-6 w-6" />
            </motion.div>
            <span className="font-bold text-lg">Time Vault</span>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
            text-cyan-400 hover:text-cyan-300 transition-all duration-300
            border border-cyan-500/20 hover:border-cyan-500/40"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                <NavLink to="/capsule/shared" icon={<Share2 size={18} />} text="Shared Vault" />
                <NavLink to="/dashboard" icon={<Grid size={18} />} text="My Vaults" />
                <NavLink to="/capsule/create" icon={<Plus size={18} />} text="New Vault" />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 
                  text-red-400 hover:text-red-300 transition-all duration-300
                  border border-red-500/20 hover:border-red-500/40"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <NavLink to="/login" text="Login" />
            )}

            {shouldShowThemeToggle && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
                text-cyan-400 hover:text-cyan-300 transition-all duration-300
                border border-cyan-500/20 hover:border-cyan-500/40"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-cyan-500/20 backdrop-blur-lg bg-black/30"
          >
            <div className="px-4 py-4 space-y-2">
              {token ? (
                <>
                  <MobileNavLink to="/capsule/shared" icon={<Share2 size={18} />} text="Shared Vault" />
                  <MobileNavLink to="/dashboard" icon={<Grid size={18} />} text="My Vaults" />
                  <MobileNavLink to="/capsule/create" icon={<Plus size={18} />} text="New Vault" />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 
                    text-red-400 hover:text-red-300 transition-all duration-300
                    border border-red-500/20 hover:border-red-500/40 text-left"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <MobileNavLink to="/login" text="Login" />
              )}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;