import React from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react"; 
import { useSignupLogic } from "../../hooks/auth/useSignupLogic"; 
import InputField from "../../components/common/FormInput";
import Button from "../../components/common/Button"; 
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { formatOtpCooldown } from '../../utils/otpCooldown';

const SignUpPage = () => {
  const { 
    formData, 
    isLoading, 
    cooldownSeconds,
    isOnCooldown,
    showPassword, 
    handleChange, 
    handleSignUp, 
    togglePassword,
    handleGoogleSuccess
  } = useSignupLogic();

  const containerRef = React.useRef(null);
  const [btnWidth, setBtnWidth] = React.useState(340);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.ResizeObserver) return undefined;

    const updateWidth = () => {
      setBtnWidth(Math.min(400, Math.max(200, container.clientWidth)));
    };
    const observer = new window.ResizeObserver(updateWidth);
    observer.observe(container);
    updateWidth();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden flex flex-col bg-[#FBFBFB] px-3 py-4 sm:px-4 sm:py-8 md:px-6 lg:py-6">
      <div className="max-w-md lg:max-w-lg w-full mx-auto my-auto bg-white rounded-[1.75rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 shadow-2xl shadow-gray-200/60 border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        <div className="mb-7 sm:mb-8 lg:mb-6">
          <Link 
            to="/store" 
            className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#2D5A43] transition-all tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> KEMBALI KE TOKO
          </Link>
        </div>

        <div className="text-left mb-7 sm:mb-8 lg:mb-6">
          <h2 className="text-[2rem] sm:text-4xl lg:text-3xl font-black text-gray-900 tracking-tighter leading-tight">
            Daftar <span className="text-[#2D5A43]">Sekarang.</span>
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-3 lg:mt-2 leading-relaxed">
            Buat akun baru untuk mulai berbelanja di UD Barokah dengan mudah.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">
          <div className="space-y-4">
            <InputField 
              label="Username" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe" 
              icon={<User size={18} />} 
              required={null}
            />
            <InputField 
              label="Email Address" 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com" 
              icon={<Mail size={18} />} 
              required={null}
            />
            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon={<Lock size={18} />}
              required={null}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePassword}
                  className="text-gray-400 hover:text-[#2D5A43] transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          <div className="pt-0">
            <Button 
              type="submit"
              isLoading={isLoading} 
              disabled={isOnCooldown}
              text={isOnCooldown ? `TUNGGU ${formatOtpCooldown(cooldownSeconds)}` : "DAFTAR SEKARANG"}
              className="w-full py-5 text-white shadow-lg shadow-green-900/10 active:scale-[0.98] transition-all font-black tracking-widest"
            />
          </div>
        </form>

        <div className="mt-6 sm:mt-7 relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gray-200"></div>
          <span className="relative bg-white px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Atau daftar dengan</span>
        </div>

        <div ref={containerRef} className="mt-5 sm:mt-6 flex justify-center hover:-translate-y-0.5 transition-transform duration-200 w-full overflow-hidden rounded-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Login/Daftar Google dibatalkan atau gagal.')}
            theme="outline"
            size="large"
            text="signup_with"
            shape="pill"
            width={btnWidth.toString()}
          />
        </div>

        <div className="mt-6 sm:mt-7 text-center">
          <p className="text-sm text-gray-400 font-medium">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-[#2D5A43] font-black hover:underline tracking-tight ml-1">
              MASUK DI SINI
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
