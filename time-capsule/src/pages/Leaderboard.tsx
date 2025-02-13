import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    {
      id: 1,
      name: "Sarah Parker",
      capsules: 15,
      coins: 1500,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
      id: 2,
      name: "Michael Chen",
      capsules: 12,
      coins: 1200,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: 3,
      name: "Emma Wilson",
      capsules: 10,
      coins: 1000,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    }
  ];

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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container"
      style={{ maxWidth: '800px' }}
    >
      <div className="glass" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <Trophy size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2rem' }}>Top Time Capsule Creators</h1>
      </div>

      {leaders.map((leader, index) => (
        <motion.div
          key={leader.id}
          variants={itemVariants}
          className="card"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '1rem',
            background: index === 0 ? 'linear-gradient(to right, var(--surface), var(--primary-hover))' : 'var(--surface)'
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={leader.avatar}
              alt={leader.name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            {index === 0 && <Trophy size={24} style={{ position: 'absolute', bottom: -10, right: -10, color: 'gold' }} />}
            {index === 1 && <Award size={24} style={{ position: 'absolute', bottom: -10, right: -10, color: 'silver' }} />}
            {index === 2 && <Medal size={24} style={{ position: 'absolute', bottom: -10, right: -10, color: '#cd7f32' }} />}
          </div>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{leader.name}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {leader.capsules} capsules created
            </p>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {leader.coins}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              TC Coins
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Leaderboard;