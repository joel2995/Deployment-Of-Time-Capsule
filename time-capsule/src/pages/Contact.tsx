import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add your form submission logic here
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030711] text-white pt-24 pb-12"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-cyan-300/70 text-lg">
            Have questions? We're here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="text-cyan-400" />
                Email Us
              </h2>
              <p className="text-cyan-300/70">
                support@timevault.com
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="text-cyan-400" />
                Live Chat
              </h2>
              <p className="text-cyan-300/70">
                Available 24/7 for premium users
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-black/30 border border-cyan-500/20 p-6 space-y-4"
          >
            <div>
              <label className="block text-cyan-400 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-black/50 border border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-cyan-700 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-cyan-400 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-black/50 border border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-cyan-700 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-cyan-400 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-black/50 border border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-cyan-700 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 
              text-cyan-400 hover:text-cyan-300 transition-all duration-300
              border border-cyan-500/20 hover:border-cyan-500/40
              flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;