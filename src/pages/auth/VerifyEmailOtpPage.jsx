import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { KeyRound, ArrowLeft, RefreshCw } from 'lucide-react';
import authService from '../../services/auth/authService';
import InputField from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { useOtpCooldown } from '../../hooks/auth/useOtpCooldown';
import { formatOtpCooldown } from '../../utils/otpCooldown';
import { getOtpRequestErrorMessage, getRetryAfterSeconds } from '../../utils/otpError';

const VerifyEmailOTP= () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);
  const email = location.state?.email || localStorage.getItem('pendingVerificationEmail') || "";
  const {
    cooldownSeconds,
    isOnCooldown,
    startCooldown,
    clearCooldown,
  } = useOtpCooldown('email', email);

  useEffect(() => {
    if (!email) {
      toast.error("Silakan register terlebih dahulu.");
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleResendOTP = async () => {
    if (!email) {
      toast.error('Email tidak ditemukan, silakan register ulang.');
      navigate('/signup');
      return;
    }

    if (isOnCooldown) return;

    setIsResending(true);
    setError(null);
    try {
      await toast.promise(
        authService.resendOTP(email),
        {
          loading: 'Mengirim kode ke email...',
          success: 'Kode OTP baru telah dikirim ke email!',
          error: (err) => getOtpRequestErrorMessage(err, 'Gagal mengirim ulang kode.'),
        },
        {
          success: { style: { background: '#2D5A43', color: '#fff' } },
        }
      );
      startCooldown(60);
    } catch (err) {
      if (err.response?.status === 429) {
        startCooldown(getRetryAfterSeconds(err));
      }
      setError(getOtpRequestErrorMessage(err, 'Gagal mengirim ulang kode.'));
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authService.verifyOTP(email, otp);
      localStorage.removeItem('pendingVerificationEmail');
      clearCooldown();
      toast.success('Akun Berhasil Diverifikasi!', {
        style: { background: '#2D5A43', color: '#fff' }
      });
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || "OTP Salah atau Kadaluwarsa";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB] px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/60 border border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="mb-10">
          <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#2D5A43] transition-all tracking-widest group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> KEMBALI KE LOGIN
          </Link>
        </div>

        <div className="text-left mb-10">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            Verifikasi <span className="text-[#2D5A43]">OTP.</span>
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">
            Masukkan 6 digit kode yang dikirim ke <span className="text-gray-800 font-bold">{email || 'email kamu'}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold rounded-r-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <InputField 
            label="KODE OTP"
            icon={<KeyRound size={18} />} 
            type="text" 
            placeholder="••••••" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required
            className="text-center tracking-[0.5em] text-2xl font-black"
            maxLength={6}
          />
          
          <Button 
            type="submit"
            isLoading={isLoading} 
            text="VERIFIKASI SEKARANG" 
            className="w-full py-5 text-white shadow-lg shadow-green-900/10 active:scale-[0.98] transition-all font-black tracking-widest bg-[#2D5A43]"
          />
        </form>

        <div className="mt-8 text-center"> 
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Tidak menerima kode?{' '}
            <button 
              type="button"
              onClick={handleResendOTP}
              disabled={isResending || isOnCooldown}
              className={`text-[#2D5A43] hover:underline ml-1 font-black inline-flex items-center gap-1 ${isResending || isOnCooldown ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isResending ? <RefreshCw size={12} className="animate-spin" /> : null}
              {isResending
                ? 'MENGIRIM...'
                : isOnCooldown
                  ? `TUNGGU ${formatOtpCooldown(cooldownSeconds)}`
                  : 'KIRIM ULANG'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailOTP;
