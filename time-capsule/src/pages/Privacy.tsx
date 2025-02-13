import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
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
          Privacy Policy
        </motion.h1>

        <div className="space-y-8">
          <Section
            icon={Shield}
            title="Data Protection"
            content="Your privacy is our top priority. We employ industry-standard encryption and security measures to protect your personal information and capsule contents."
          />

          <Section
            icon={Lock}
            title="Information Collection"
            content="We only collect information that's necessary for the functioning of your time capsules. This includes email addresses, capsule contents, and basic usage data."
          />

          <Section
            icon={Eye}
            title="Data Usage"
            content="Your data is used solely for providing and improving the Time Vault service. We never sell or share your personal information with third parties."
          />

          <Section
            icon={FileText}
            title="Your Rights"
            content="You have the right to access, modify, or delete your personal information at any time. Contact our support team for assistance with data-related requests."
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

export default Privacy;