import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Coins, Lock, Unlock, Plus, Trophy, LogOut, Edit, Trash2, Clock, Calendar, Eye, Edit2, ChevronRight, Calendar as CalendarIcon, Timer } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import "./Dashboard.css"
import {API_URL} from '../const/const';


interface UserData {
  id: string;
  username: string;
  email: string;
  tcCoins: number;
  role: string;
  isVerified: boolean;
}

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

interface Capsule {
  id: string;
  title: string;
  type: 'private' | 'public';
  openDate: string;
  created: string;
  isShared?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const capsuleVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400
    }
  },
  tap: {
    scale: 0.98
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [publicCapsules, setPublicCapsules] = useState<Capsule[]>([]);
  const [myCapsules, setMyCapsules] = useState<Capsule[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const decoded = jwtDecode<DecodedToken>(token);
        const userId = decoded.id;

        // Fetch user profile (no token header needed)
        const userResponse = await axios.get(`${API_URL}/api/auth/profile/${userId}`);
        // Fetch public capsules (no token header needed)
        const capsulesResponse = await axios.get(`${API_URL}/api/capsules/public`);
        // Fetch capsules created by the logged-in user (no token header)
        const myCapsulesResponse = await axios.get(`${API_URL}/api/capsules/usercapsules/${userId}`);

        if (userResponse.data.success) {
          setUserData(userResponse.data.user);
        }

        if (capsulesResponse.data.success) {
          setPublicCapsules(capsulesResponse.data.capsules);
        }

        if (myCapsulesResponse.data.success) {
          setMyCapsules(myCapsulesResponse.data.capsules);
        }
      } catch (error: any) {
        console.error('Failed to fetch data:', error);
        toast.error(error.response?.data?.message || 'Failed to load data');
        
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleDelete = async (capsuleId: string) => {
    if (!window.confirm('Are you sure you want to delete this capsule? This action cannot be undone.')) {
      return;
    }
  
    try {
      setDeletingId(capsuleId);
      const response = await axios.delete(`/api/capsules/${capsuleId}`);
      
      if (response.data.success) {
        setMyCapsules(prevCapsules => 
          prevCapsules.filter(c => (c._id || c.id) !== capsuleId)
        );
        toast.success('Capsule deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete capsule:', error);
      toast.error('Failed to delete capsule');
    } finally {
      setDeletingId(null);
    }
  };

  return (
// Update the root div to add padding-top to account for navbar
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#030711] text-white overflow-x-hidden pt-24 px-6"
      >
      {/* Header Section */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 p-6 mb-8 shadow-lg shadow-cyan-500/10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ambient glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5"
          animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.02, 1],
          }}
          transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
          }}
        />

        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-3">
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          Welcome back, {userData?.username ? (
            <motion.span
          className="text-white"
          whileHover={{ scale: 1.05 }}
            >
          {userData.username}
            </motion.span>
          ) : 'User'}
        </motion.h1>

        <motion.div 
          className="flex items-center gap-2 text-cyan-400"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{
          rotate: [0, 360]
            }}
            transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
            }}
          >
            <Coins size={24} className="text-cyan-400" />
          </motion.div>
          <span className="text-lg font-semibold">{userData?.tcCoins || 0} TC</span>
        </motion.div>
          </div>

          <div className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            to="/capsule/create"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 
            text-white font-semibold shadow-lg shadow-cyan-500/20
            flex items-center gap-2 hover:brightness-110 transition-all duration-300"
          >
            <Plus size={20} />
            Create Capsule
          </Link>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="px-6 py-3 rounded-xl bg-black/40 border border-red-500/30
          text-red-400 font-semibold flex items-center gap-2
          hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300"
        >
          <LogOut size={20} />
          Logout
        </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Capsules Created by User */}
      <motion.div 
        className="capsules-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center gap-3 mb-6">
          <CalendarIcon className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Your Time Capsules</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-12 h-12 border-t-2 border-r-2 border-cyan-500 rounded-full"
            />
          </div>
        ) : myCapsules.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            <AnimatePresence>
              {myCapsules.map((capsule: any) => (
                <motion.div
                  key={capsule._id || capsule.id}
                  variants={capsuleVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layoutId={capsule._id || capsule.id}
                  className="relative overflow-hidden rounded-xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 p-6"
                >
                  {/* Ambient glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"
                    animate={{
                      opacity: [0.1, 0.2, 0.1],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Capsule Type Icon with Animation */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="inline-block"
                    >
                      {capsule.type === 'private' ? (
                        <Lock className="text-cyan-400" size={24} />
                      ) : (
                        <Unlock className="text-cyan-400" size={24} />
                      )}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white/90 group-hover:text-cyan-300 
                      transition-colors flex items-center gap-2">
                      {capsule.title || capsule.name}
                    </h3>

                    {/* Opening Date */}
                    <div className="flex items-center gap-2 text-cyan-300/80">
                      <Timer size={16} />
                      <p className="text-sm">
                        Opens:{' '}
                        <span className="text-white/80">
                          {new Date(capsule.dateOfOpening || capsule.openDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </p>
                    </div>

                    {/* Creation Date */}
                    <div className="flex items-center gap-2 text-cyan-400/60">
                      <Clock size={14} />
                      <span className="text-xs">
                        Created:{' '}
                        {new Date(capsule.dateOfCreation || capsule.created).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <motion.div className="flex items-center gap-2" variants={containerVariants}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            to={`/capsules/${capsule._id || capsule.id}`}
                            className="px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
                            text-cyan-400 hover:text-cyan-300 transition-all duration-300
                            border border-cyan-500/20 hover:border-cyan-500/40
                            flex items-center gap-2 text-sm"
                          >
                            <Eye size={16} />
                            View
                          </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            to={`/capsule/edit/${capsule._id || capsule.id}`}
                            className="px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 
                            text-emerald-400 hover:text-emerald-300 transition-all duration-300
                            border border-emerald-500/20 hover:border-emerald-500/40
                            flex items-center gap-2 text-sm"
                          >
                            <Edit2 size={16} />
                            Edit
                          </Link>
                        </motion.div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(capsule._id || capsule.id)}
                          disabled={deletingId === (capsule._id || capsule.id)}
                          className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${
                            deletingId === (capsule._id || capsule.id)
                              ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                              : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40'
                          } transition-all duration-300`}
                        >
                          {deletingId === (capsule._id || capsule.id) ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Trash2 size={16} />
                              Delete
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-state text-center py-12 rounded-xl backdrop-blur-lg bg-black/30 border border-cyan-500/20"
          >
            <p className="text-cyan-400/80 mb-4">You haven't created any capsules yet.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/capsule/create" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
                text-cyan-400 hover:text-cyan-300 transition-all duration-300
                border border-cyan-500/20 hover:border-cyan-500/40"
              >
                <Plus size={20} />
                Create Your First Capsule
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      
    </motion.div>
  );
};

export default Dashboard;