import React from 'react';
import { motion } from 'framer-motion';

interface OtpVerificationProps {
  otp: string;
  setOtp: (otp: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  title?: string;
  subtitle?: string;
}

const OtpVerification = ({
  otp,
  setOtp,
  onSubmit,
  title = "Verify OTP",
  subtitle = "Please enter the OTP sent to your email"
}: OtpVerificationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container"
      style={{ maxWidth: '400px' }}
    >
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              style={{ letterSpacing: '0.5em', textAlign: 'center' }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Verify OTP
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default OtpVerification;