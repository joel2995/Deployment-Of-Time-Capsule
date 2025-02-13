import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CapsuleData {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  type: 'private' | 'public';
  openDate: string;
  dateOfOpening?: string;
  created?: string;
  dateOfCreation?: string;
}

const EditCapsule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [capsule, setCapsule] = useState<CapsuleData>({
    title: '',
    description: '',
    type: 'private',
    openDate: '',
  });

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await axios.get(`/api/capsules/${id}`);
        if (response.data.success) {
          const capsuleData = response.data.capsule;
          setCapsule({
            ...capsuleData,
            openDate: capsuleData.dateOfOpening || capsuleData.openDate,
            title: capsuleData.title || capsuleData.name,
          });
        }
      } catch (error) {
        toast.error('Failed to fetch capsule details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axios.put(`/api/capsules/${id}`, capsule);
      if (response.data.success) {
        toast.success('Capsule updated successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to update capsule');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this capsule? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await axios.delete(`/api/capsules/${id}`);
      if (response.data.success) {
        toast.success('Capsule deleted successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to delete capsule');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6"
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="backdrop-blur-lg bg-black/30 border border-cyan-500/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Edit Capsule</h1>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`p-2 rounded-lg flex items-center gap-2 ${
                deleting
                  ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300'
              } transition-all duration-300 border border-red-500/20 hover:border-red-500/40`}
              title="Delete capsule"
            >
              {deleting ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 size={20} />
                  Delete Capsule
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-cyan-300">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={capsule.title}
                onChange={(e) => setCapsule({ ...capsule, title: e.target.value })}
                className="w-full bg-black/50 border border-cyan-500/20 rounded-lg px-4 py-2 text-white 
                focus:outline-none focus:border-cyan-500/50 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-cyan-300">
                Description
              </label>
              <textarea
                id="description"
                value={capsule.description}
                onChange={(e) => setCapsule({ ...capsule, description: e.target.value })}
                className="w-full bg-black/50 border border-cyan-500/20 rounded-lg px-4 py-2 text-white 
                focus:outline-none focus:border-cyan-500/50 transition-colors min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="openDate" className="block text-sm font-medium text-cyan-300">
                Opening Date
              </label>
              <input
                type="datetime-local"
                id="openDate"
                value={capsule.openDate}
                onChange={(e) => setCapsule({ ...capsule, openDate: e.target.value })}
                className="w-full bg-black/50 border border-cyan-500/20 rounded-lg px-4 py-2 text-white 
                focus:outline-none focus:border-cyan-500/50 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-300">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="private"
                    checked={capsule.type === 'private'}
                    onChange={(e) => setCapsule({ ...capsule, type: e.target.value as 'private' | 'public' })}
                    className="text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-white">Private</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="public"
                    checked={capsule.type === 'public'}
                    onChange={(e) => setCapsule({ ...capsule, type: e.target.value as 'private' | 'public' })}
                    className="text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-white">Public</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  saving
                    ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                    : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300'
                } transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40`}
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditCapsule;