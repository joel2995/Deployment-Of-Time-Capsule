import { motion } from 'framer-motion';
import { Scale, Users, AlertCircle, Heart } from 'lucide-react';

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030711] text-white pt-24 pb-12"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Terms of Service
        </motion.h1>

        <div className="space-y-8">
          <Section
            icon={Scale}
            title="Terms of Use"
            content="By using Time Vault, you agree to these terms and conditions. We reserve the right to modify these terms at any time, with notice to users."
          />

          <Section
            icon={Users}
            title="User Responsibilities"
            content="Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account."
          />

          <Section
            icon={AlertCircle}
            title="Content Guidelines"
            content="Users must not upload illegal, harmful, or inappropriate content. We reserve the right to remove content that violates our guidelines."
          />

          <Section
            icon={Heart}
            title="Service Commitment"
            content="We strive to maintain 99.9% uptime and secure storage of your time capsules. However, we recommend keeping backup copies of important content."
          />
        </div>
      </div>
    </motion.div>
  );
};

const Section = ({ icon: Icon, title, content }: { icon: any, title: string, content: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
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
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-cyan-300/70 leading-relaxed">{content}</p>
    </div>
  </motion.div>
);

export default Terms;