import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setOtpSent(true);
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/notes');
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <div>
      <h2>Login / Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {!otpSent ? (
        <button onClick={sendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const handleGoogleLogin = async (credentialResponse: any) => {
  const decoded: any = jwtDecode(credentialResponse.credential);
  const email = decoded.email;

  try {
    const res = await axios.post('http://localhost:5000/api/auth/google-login', { email });
    localStorage.setItem('token', res.data.token);
    navigate('/notes');
  } catch (err) {
    alert('Google login failed');
  }
};


export default Login;


