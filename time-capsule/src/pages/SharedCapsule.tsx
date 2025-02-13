import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Lock, Unlock, Coins, Mail, Key, Hexagon, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../const/const'; // Update this import

interface AccessForm {
  email: string;
  uniqueCode: string;
}

const SharedCapsule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AccessForm>({
    email: '',
    uniqueCode: ''
  });
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);

    try {
      // Simple API call without auth headers
      const response = await axios.post(`${API_URL}/api/capsules/private`, {
        email: formData.email,
        uniqueCode: formData.uniqueCode
      });

      if (response.data.capsule) {
        toast.success('Capsule unlocked successfully!');
        // Navigate to the correct route
        navigate(`/capsules/${response.data.capsule._id}`);
      }
    } catch (error: any) {
      console.error('Access error:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 403:
            toast.error('Email not in allowed users list');
            break;
          case 404:
            toast.error('Invalid access code');
            break;
          case 400:
            toast.error('Please provide both email and access code');
            break;
          default:
            toast.error('Failed to unlock capsule');
        }
      } else {
        toast.error('Network error - Please check your connection');
      }
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030711] text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Floating Hexagons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed"
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            opacity: 0 
          }}
          animate={{
            y: [-500, 500],
            opacity: [0, 0.1, 0],
            scale: [0.5, 1.5],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
          }}
        >
          <Hexagon size={100} className="text-cyan-500/10" />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
      >
        <motion.div 
          className="w-full max-w-md p-8 rounded-xl backdrop-blur-lg bg-black/30 border border-cyan-500/20"
          whileHover={{ boxShadow: "0 0 25px rgba(6,182,212,0.15)" }}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-cyan-500/10 
              flex items-center justify-center border border-cyan-500/20"
              animate={{
                scale: [1, 1.1, 1],
                borderColor: ["rgba(6,182,212,0.2)", "rgba(6,182,212,0.6)", "rgba(6,182,212,0.2)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: isUnlocking ? 360 : 0 }}
                transition={{ duration: 1, repeat: isUnlocking ? Infinity : 0 }}
              >
                {isUnlocking ? 
                  <Unlock className="w-8 h-8 text-cyan-400" /> : 
                  <Lock className="w-8 h-8 text-cyan-400" />
                }
              </motion.div>
            </motion.div>

            <h1 className="text-2xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
              Access Shared Vault
            </h1>

            <div className="flex items-center justify-center gap-2 text-cyan-400">
              <Coins className="w-4 h-4" />
              <span className="text-sm">Cost: 25 TC Coins</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-cyan-500/20 
                  text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  disabled={isUnlocking}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cyan-300">Access Code</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  value={formData.uniqueCode}
                  onChange={(e) => setFormData({ ...formData, uniqueCode: e.target.value })}
                  placeholder="Enter unique code"
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-cyan-500/20 
                  text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  disabled={isUnlocking}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isUnlocking}
              className="w-full py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
              text-cyan-400 hover:text-cyan-300 transition-all duration-300
              border border-cyan-500/20 hover:border-cyan-500/40
              flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isUnlocking ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <span>Unlock Vault</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SharedCapsule;