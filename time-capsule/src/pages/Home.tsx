import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer as TimeCapsule, ArrowRight, Star, Users, Eye, ChevronRight, Lock, Hexagon, Shield, Clock, Share2, History } from 'lucide-react';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const featuredCapsules = [
    {
      id: 1,
      title: "Class of 2025",
      description: "A collection of memories from our graduation year",
      author: "Sarah Parker",
      views: 1234
    },
    {
      id: 2,
      title: "World Cup 2024",
      description: "Capturing the excitement of football's biggest event",
      author: "Mike Johnson",
      views: 987
    },
    {
      id: 3,
      title: "Tech Predictions",
      description: "What we think the future holds for technology",
      author: "Alex Chen",
      views: 756
    }
  ];

  // Add these new animation variants
  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(6, 182, 212, 0.2)",
        "0 0 60px rgba(6, 182, 212, 0.4)",
        "0 0 20px rgba(6, 182, 212, 0.2)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030711] overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6"
      >
        {/* Animated Hexagon Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -1000],
                opacity: [0, 0.5, 0],
                scale: [0, 1.5],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
              }}
            >
              <Hexagon size={100} className="text-cyan-500/10" />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.div 
          variants={floatVariants}
          animate="animate"
          className="relative z-10 text-center space-y-8"
        >
          {/* Logo Animation */}
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="relative w-32 h-32 mx-auto"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border-2 border-cyan-400/40"
            />
            <TimeCapsule size={64} className="absolute inset-0 m-auto text-cyan-400" />
          </motion.div>

          {/* Title with Glitch Effect */}
          <motion.h1 
            className="text-6xl sm:text-7xl font-bold"
            animate={{ textShadow: ["0 0 20px #06b6d4", "0 0 0px #06b6d4"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Time Vault
            </span>
          </motion.h1>

          <p className="text-xl text-cyan-300/80 max-w-2xl mx-auto leading-relaxed">
            Encrypt your memories in the digital realm, unlock them when destiny aligns
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                to="/register">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-between w-full">
                  <span className="text-cyan-400 font-semibold">Initialize Vault</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
                <motion.div
                  className="absolute inset-0 border border-cyan-500/50 rounded-lg"
                  animate={{
                  opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"               >
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">Access Vault</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            variants={floatVariants}
            animate="animate"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              The Future of Digital Time Capsules
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Storage",
                description: "Military-grade encryption keeps your memories safe until their reveal date"
              },
              {
                icon: Clock,
                title: "Time-Locked",
                description: "Set precise unlock dates for your capsules to be revealed in the future"
              },
              {
                icon: Share2,
                title: "Share Stories",
                description: "Create public capsules to share with the world or keep them private"
              },
              {
                icon: History,
                title: "Preserve History",
                description: "Capture moments in time for future generations to discover"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group p-6 backdrop-blur-lg bg-black/30 border border-cyan-500/20 rounded-xl"
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <feature.icon className="text-cyan-400" size={24} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-cyan-300/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-24 px-6 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            variants={floatVariants}
            animate="animate"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              How Time Vault Works
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Vault",
                description: "Sign up and start creating your digital time capsule with photos, messages, and files"
              },
              {
                step: "02",
                title: "Set The Timer",
                description: "Choose when your capsule will be unlocked - days, months, or years into the future"
              },
              {
                step: "03",
                title: "Share & Wait",
                description: "Share your capsule with friends or keep it private, then wait for the unlock date"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative p-8 backdrop-blur-lg bg-black/30 border border-cyan-500/20 rounded-lg">
                  <div className="text-6xl font-bold text-cyan-500/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-cyan-300/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Capsules Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative px-6 py-16"
      >
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-white mb-12 flex items-center gap-3"
            variants={floatVariants}
            animate="animate"
          >
            <Star className="text-cyan-400" size={28} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              Featured Vaults
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCapsules.map((capsule, index) => (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                {/* Card Background with Animated Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl" />
                
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    background: [
                      'linear-gradient(90deg, #06b6d4 0%, transparent 50%, transparent 100%)',
                      'linear-gradient(180deg, #06b6d4 0%, transparent 50%, transparent 100%)',
                      'linear-gradient(270deg, #06b6d4 0%, transparent 50%, transparent 100%)',
                      'linear-gradient(0deg, #06b6d4 0%, transparent 50%, transparent 100%)',
                      'linear-gradient(90deg, #06b6d4 0%, transparent 50%, transparent 100%)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ padding: '1px' }}
                />

                {/* Card Content */}
                <div className="relative backdrop-blur-sm bg-black/30 p-6 rounded-xl h-full">
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center"
                      >
                        <Star className="text-cyan-400" size={20} />
                      </motion.div>
                      <span className="text-cyan-400/60 text-sm">{`ID: ${capsule.id.toString().padStart(4, '0')}`}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {capsule.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm">
                      {capsule.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-cyan-300/70">
                      <div className="flex items-center gap-2">
                        <Users size={14} />
                        <span>{capsule.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={14} />
                        <span>{capsule.views}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 px-4 py-2 rounded-lg bg-cyan-500/10 
                      hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 
                      transition-all duration-300 border border-cyan-500/20 
                      hover:border-cyan-500/40 flex items-center justify-center gap-2 group"
                    >
                      <span>Access Vault</span>
                      <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;