import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mt-auto border-t border-cyan-500/20 backdrop-blur-lg bg-black/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">Time Vault</h3>
            <p className="text-cyan-300/70 text-sm">
              Secure your memories in the digital realm.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/about" className="text-cyan-300/70 hover:text-cyan-300 transition-colors text-sm">About</Link>
              <Link to="/privacy" className="text-cyan-300/70 hover:text-cyan-300 transition-colors text-sm">Privacy</Link>
              <Link to="/terms" className="text-cyan-300/70 hover:text-cyan-300 transition-colors text-sm">Terms</Link>
              <Link to="/contact" className="text-cyan-300/70 hover:text-cyan-300 transition-colors text-sm">Contact</Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Contact</h4>
            <div className="space-y-2 text-sm text-cyan-300/70">
              <p>Email: support@timevault.com</p>
              <p>Location: Digital Realm</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { Icon: Github, href: 'https://github.com/yourusername' },
                { Icon: Twitter, href: 'https://twitter.com/yourusername' },
                { Icon: Mail, href: 'mailto:contact@timevault.com' }
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 
                  text-cyan-400 hover:text-cyan-300 transition-all duration-300
                  border border-cyan-500/20 hover:border-cyan-500/40"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cyan-300/70 text-sm">
              © {new Date().getFullYear()} Time Vault. All rights reserved.
            </p>
            <motion.div 
              className="flex items-center gap-2 text-cyan-300/70 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart size={14} className="text-red-400" /> by Time Vault Team
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;