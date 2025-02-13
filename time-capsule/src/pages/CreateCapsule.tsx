import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Lock, Globe, Calendar, Upload, Link, X, ArrowLeft, Moon, Sun } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TimeCapsule.css';

import { API_URL } from '../const/const';
import { useTheme } from '../contexts/ThemeContext';

const CreateCapsule = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    dateOfOpening: '',
    message: '',
    type: 'public',
    media: [],
    links: [],
    allowedUsers: []
  });
  const [newLink, setNewLink] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a JSON payload
      const payload = {
        email: formData.email,
        name: formData.name,
        dateOfOpening: formData.dateOfOpening,
        message: formData.message,
        type: formData.type,
        isShared: formData.type === 'private',
        media: formData.media, // Ensure these are appropriate values (e.g. filenames or URLs)
        links: formData.links,
        allowedUsers: formData.type === 'private' ? formData.allowedUsers : [],
      };

      // Send JSON payload to backend
      // Inside your handleSubmit function
      const response = await axios.post(`${API_URL}/api/capsules/create`, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.data.capsule && response.data.capsule.uniqueCode) {
        setUniqueCode(response.data.capsule.uniqueCode);
        setShowSuccessModal(true);
      }

      showNotification(response.data.message, 'success');
      setFormData({
        email: '',
        name: '',
        dateOfOpening: '',
        message: '',
        type: 'public',
        media: [],
        links: [],
        allowedUsers: []
      });
    } catch (error) {
      console.error('Capsule creation error:', error);
      showNotification('Failed to create time capsule', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        media: Array.from(e.target.files)
      });
    }
  };

  const addLink = () => {
    if (newLink && isValidUrl(newLink)) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, newLink]
      }));
      setNewLink('');
    } else {
      showNotification('Please enter a valid URL', 'error');
    }
  };

  const removeLink = (index) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const addAllowedUser = () => {
    if (newEmail && isValidEmail(newEmail)) {
      setFormData(prev => ({
        ...prev,
        allowedUsers: [...prev.allowedUsers, newEmail]
      }));
      setNewEmail('');
    } else {
      showNotification('Please enter a valid email address', 'error');
    }
  };

  const removeAllowedUser = (index) => {
    setFormData(prev => ({
      ...prev,
      allowedUsers: prev.allowedUsers.filter((_, i) => i !== index)
    }));
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Code copied to clipboard!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error('Failed to copy code', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Copy failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 p-4 md:p-8"
    >
      <ToastContainer />

      <div className="max-w-4xl mx-auto bg-gray-50 dark:backdrop-blur-lg dark:bg-black/40 border border-gray-200 dark:border-cyan-500/20 rounded-2xl p-6 md:p-8 shadow-lg dark:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-cyan-500/20 rounded-xl transition-colors group"
            title="Go back to dashboard"
          >
            <ArrowLeft className="text-gray-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-500 dark:bg-clip-text dark:text-transparent">
            Create Time Capsule
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-cyan-500/20 rounded-xl transition-colors group"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
            ) : (
              <Moon className="text-gray-600 group-hover:scale-110 transition-transform" size={24} />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="form-group">
              <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-cyan-500/30 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-100 placeholder-gray-500 dark:placeholder-cyan-700 focus:outline-none focus:border-gray-500 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-gray-500/50 dark:focus:ring-cyan-500/50 transition-all"
                required
              />
            </div>

            {/* Name Field */}
            <div className="form-group">
              <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-cyan-500/30 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-100 placeholder-gray-500 dark:placeholder-cyan-700 focus:outline-none focus:border-gray-500 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-gray-500/50 dark:focus:ring-cyan-500/50 transition-all"
                required
              />
            </div>

            {/* Type Selection */}
            <div className="form-group">
              <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="type"
                    value="public"
                    checked={formData.type === 'public'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`p-3 rounded-xl border ${formData.type === 'public'
                    ? 'bg-cyan-500/20 border-cyan-500/50'
                    : 'bg-black/30 border-cyan-500/20 hover:bg-cyan-500/10'
                    } transition-all duration-300`}>
                    <Globe className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-cyan-300">Public</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="type"
                    value="private"
                    checked={formData.type === 'private'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`p-3 rounded-xl border ${formData.type === 'private'
                    ? 'bg-cyan-500/20 border-cyan-500/50'
                    : 'bg-black/30 border-cyan-500/20 hover:bg-cyan-500/10'
                    } transition-all duration-300`}>
                    <Lock className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-cyan-300">Private</span>
                </label>
              </div>
            </div>

            {/* Opening Date */}
            <div className="form-group">
              <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium flex items-center gap-2">
                <Calendar size={20} />
                Opening Date
              </label>
              <input
                type="date"
                name="dateOfOpening"
                value={formData.dateOfOpening}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-cyan-500/30 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-100 focus:outline-none focus:border-gray-500 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-gray-500/50 dark:focus:ring-cyan-500/50 transition-all"
                required
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-cyan-500/30 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-100 placeholder-gray-500 dark:placeholder-cyan-700 focus:outline-none focus:border-gray-500 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-gray-500/50 dark:focus:ring-cyan-500/50 transition-all min-h-[120px]"
                required
              />
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium flex items-center gap-2">
                <Upload size={20} />
                Add Files (optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-cyan-500/30 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-100 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gray-100 dark:file:bg-cyan-500/20 file:text-gray-700 dark:file:text-cyan-400 hover:file:bg-gray-200 dark:hover:file:bg-cyan-500/30 transition-all"
                  accept="image/*,video/*,application/pdf"
                />
              </div>
            </div>

            {/* Links */}
            <div className="form-group">
              <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium flex items-center gap-2">
                <Link size={20} />
                Add Links (optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  className="flex-1 bg-white dark:bg-black/50 border border-gray-300 dark:border-cyan-500/30 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-100 placeholder-gray-500 dark:placeholder-cyan-700 focus:outline-none focus:border-gray-500 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-gray-500/50 dark:focus:ring-cyan-500/50 transition-all"
                  placeholder="https://example.com"
                />
                <button
                  type="button"
                  onClick={addLink}
                  className="px-4 py-2 bg-gray-100 dark:bg-cyan-500/20 hover:bg-gray-200 dark:hover:bg-cyan-500/30 text-gray-700 dark:text-cyan-400 rounded-xl border border-gray-300 dark:border-cyan-500/50 transition-all"
                >
                  Add
                </button>
              </div>
              {formData.links.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-cyan-500/10 rounded-lg p-2">
                      <Link size={16} className="text-gray-700 dark:text-cyan-400" />
                      <span className="flex-1 text-gray-700 dark:text-cyan-300 truncate">{link}</span>
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-cyan-500/20 rounded-lg transition-colors"
                      >
                        <X size={16} className="text-gray-700 dark:text-cyan-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Allowed Users for Private Capsules */}
            {formData.type === 'private' && (
              <div className="form-group">
                <label className="block text-gray-700 dark:text-cyan-400 mb-2 font-medium">Allow Access (Email)</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="flex-1 bg-white dark:bg-black/50 border border-gray-300 dark:border-cyan-500/30 rounded-xl px-4 py-3 text-gray-900 dark:text-cyan-100 placeholder-gray-500 dark:placeholder-cyan-700 focus:outline-none focus:border-gray-500 dark:focus:border-cyan-500/50 focus:ring-1 focus:ring-gray-500/50 dark:focus:ring-cyan-500/50 transition-all"
                    placeholder="user@example.com"
                  />
                  <button
                    type="button"
                    onClick={addAllowedUser}
                    className="px-4 py-2 bg-gray-100 dark:bg-cyan-500/20 hover:bg-gray-200 dark:hover:bg-cyan-500/30 text-gray-700 dark:text-cyan-400 rounded-xl border border-gray-300 dark:border-cyan-500/50 transition-all"
                  >
                    Add
                  </button>
                </div>
                {formData.allowedUsers.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.allowedUsers.map((email, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-cyan-500/10 rounded-lg p-2">
                        <span className="flex-1 text-gray-700 dark:text-cyan-300">{email}</span>
                        <button
                          type="button"
                          onClick={() => removeAllowedUser(index)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-cyan-500/20 rounded-lg transition-colors"
                        >
                          <X size={16} className="text-gray-700 dark:text-cyan-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative px-8 py-4 bg-gray-100 dark:bg-cyan-500/20 hover:bg-gray-200 dark:hover:bg-cyan-500/30 text-gray-900 dark:text-cyan-400 rounded-xl border border-gray-300 dark:border-cyan-500/50 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/30 to-gray-500/0 dark:from-cyan-500/0 dark:via-cyan-500/30 dark:to-cyan-500/0 group-hover:translate-x-full duration-500" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 dark:border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Create Capsule
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-500/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full bg-white dark:backdrop-blur-lg dark:bg-black/40 border border-gray-200 dark:border-cyan-500/20 rounded-2xl p-6 shadow-lg dark:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-700 dark:text-cyan-400">Capsule Created Successfully!</h2>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-cyan-500/20 rounded-xl transition-colors"
                aria-label="Close modal"
              >
                <X className="text-gray-700 dark:text-cyan-400" size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-cyan-300">
                Your private capsule has been created. Here's your unique access code:
              </p>
              <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-cyan-500/10 rounded-xl border border-gray-300 dark:border-cyan-500/30">
                <code className="flex-1 font-mono text-gray-700 dark:text-cyan-400 text-lg">{uniqueCode}</code>
                <button
                  onClick={() => copyToClipboard(uniqueCode)}
                  className="px-4 py-2 bg-gray-100 dark:bg-cyan-500/20 hover:bg-gray-200 dark:hover:bg-cyan-500/30 text-gray-700 dark:text-cyan-400 rounded-lg transition-colors"
                  aria-label="Copy code to clipboard"
                >
                  Copy Code
                </button>
              </div>
              <p className="text-amber-400 text-sm font-medium">
                Important: Save this code! You'll need it to access your capsule later.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default CreateCapsule;