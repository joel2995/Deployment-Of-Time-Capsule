import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Lock, Eye, Share2, Timer, 
  Video, Image as ImageIcon, FileText, Link as LinkIcon, X,
  Shield, Hexagon
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

// Remove the CSS import as we'll use Tailwind
// import '../styles/ViewCapsule.css';

interface CapsuleData {
  _id: string;
  name: string;
  message: string;
  type: 'public' | 'private';
  dateOfOpening: string;
  dateOfCreation: string;
  views?: number;
  media?: string[];
  links?: string[];
  creator: string;
  isShared?: boolean;
  uniqueCode?: string;
}

const ViewCapsule = () => {
  const { capsuleId } = useParams<{ capsuleId: string }>();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState<CapsuleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessData, setAccessData] = useState({
    email: '',
    uniqueCode: ''
  });

  useEffect(() => {
    if (!capsuleId) {
      console.log('No capsuleId provided');
      return;
    }
    
    const fetchCapsule = async () => {
      try {
        console.log('Fetching capsule:', capsuleId);
        const response = await axios.get(`https://eter-backend.onrender.com/api/capsules/public`);
        console.log('Response:', response.data);
        
        const foundCapsule = response.data.capsules.find(
          (c: any) => c._id === capsuleId
        );
        console.log('Found capsule:', foundCapsule);
        
        if (foundCapsule) {
          setCapsule(foundCapsule);
        } else {
          setShowAccessModal(true);
        }
      } catch (error: any) {
        console.error('Error details:', error);
        toast.error(error.response?.data?.message || 'Failed to load capsule');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [capsuleId, navigate]);

  const handleAccessPrivateCapsule = async () => {
    try {
      if (!accessData.email || !accessData.uniqueCode) {
        toast.error('Please provide both email and access code');
        return;
      }

      const response = await axios.post('/api/capsules/private', {
        email: accessData.email,
        uniqueCode: accessData.uniqueCode
      });

      if (response.data.capsule) {
        setCapsule(response.data.capsule);
        setShowAccessModal(false);
        toast.success('Capsule unlocked successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to unlock capsule');
    }
  };

  // Add animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030711]">
        <motion.div
          animate={{
            rotate: 360,
            borderColor: ['#06b6d4', '#3b82f6', '#06b6d4'],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030711] text-white p-6"
    >
      {/* Animated Background */}
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

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
            text-cyan-400 hover:text-cyan-300 transition-all duration-300
            border border-cyan-500/20 hover:border-cyan-500/40"
          >
            <ArrowLeft size={24} />
          </motion.button>

          <h1 className="text-2xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-cyan-400 to-blue-400">
            {capsule?.name}
          </h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {}}
            className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
            text-cyan-400 hover:text-cyan-300
            transition-all duration-300
            border border-cyan-500/20 hover:border-cyan-500/40"
          >
            <Share2 size={24} />
          </motion.button>
        </motion.div>

        {/* Capsule Content */}
        <AnimatePresence mode="wait">
          {capsule && new Date(capsule.dateOfOpening) <= new Date() ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Message */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl backdrop-blur-lg bg-black/30 
                border border-cyan-500/20 relative overflow-hidden"
              >
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
                <p className="relative z-10 text-cyan-300/90 leading-relaxed">
                  {capsule.message}
                </p>
              </motion.div>

              {/* Media Grid */}
              {capsule.media && capsule.media.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {capsule.media.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="relative p-4 rounded-lg backdrop-blur-lg 
                      bg-black/30 border border-cyan-500/20"
                    >
                      {/* Add media content rendering logic here */}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Links */}
              {capsule.links && capsule.links.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-2"
                >
                  {capsule.links.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-center gap-2 p-4 rounded-lg 
                      bg-cyan-500/10 hover:bg-cyan-500/20 
                      text-cyan-400 hover:text-cyan-300 transition-all duration-300
                      border border-cyan-500/20 hover:border-cyan-500/40"
                    >
                      <LinkIcon size={16} />
                      <span>{link}</span>
                    </motion.a>
                  ))}
                </motion.div>
              )}

              {/* View Counter */}
              {capsule.type === 'public' && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2 text-cyan-400/60"
                >
                  <Eye size={16} />
                  <span>{capsule.views || 0} views</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block p-8 rounded-full bg-cyan-500/10 mb-6"
              >
                <Lock size={48} className="text-cyan-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">
                This Vault is Sealed
              </h2>
              <p className="text-cyan-300/60">
                Opens on {new Date(capsule?.dateOfOpening || '').toLocaleDateString()}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Access Modal */}
        <AnimatePresence>
          {showAccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md p-6 rounded-xl backdrop-blur-lg bg-black/30 border border-cyan-500/20"
              >
                {/* Modal content... */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ViewCapsule;