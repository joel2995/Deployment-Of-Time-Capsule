import { motion } from 'framer-motion';
import { Shield, Clock, Users, Lock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Military-grade encryption keeps your memories safe"
    },
    {
      icon: Clock,
      title: "Time-Locked Content",
      description: "Set precise unlock dates for your digital time capsules"
    },
    {
      icon: Users,
      title: "Shared Memories",
      description: "Create public or private capsules to share with specific people"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is encrypted and only accessible to authorized users"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030711] text-white pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Time Vault
          </h1>
          <p className="text-cyan-300/70 text-lg max-w-2xl mx-auto">
            Preserving digital memories for the future, Time Vault enables you to create time-locked capsules of your most precious moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 p-6"
            >
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
              <div className="relative z-10">
                <feature.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-cyan-300/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-cyan-300/70 text-lg leading-relaxed">
            We believe in the power of preserving memories in the digital age. Our platform provides a secure and innovative way to capture moments, thoughts, and media, allowing you to share them at the perfect moment in the future.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;