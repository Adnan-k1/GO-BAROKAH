import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useLoginLogic } from '../hooks/useLoginLogic';
import InputField from '../components/common/FormInput';
import Button from '../components/common/Button'; // Pastikan import mengarah ke Button yang di atas

const Login = () => {
  const { formData, handleChange, handleLogin, isLoading, error } = useLoginLogic();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB] px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/60 border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        
        <div className="mb-10">
          <Link 
            to="/store" 
            className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#2D5A43] transition-all tracking-widest"
          >
            <ArrowLeft size={14} /> KEMBALI KE TOKO
          </Link>
        </div>

        
        <div className="text-left mb-10">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            Selamat <span className="text-[#2D5A43]">Datang.</span>
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">
            Masuk untuk melanjutkan belanja bahan pangan organik terbaik dari UD Barokah.
          </p>
        </div>

        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold rounded-r-xl animate-in slide-in-from-top">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Email Address
            </label>
            <InputField 
              icon={<Mail size={18} className="text-gray-400" />} 
              type="email" 
              name="email"
              placeholder="adnangian12@gmail.com" 
              value={formData.email} 
              onChange={handleChange} 
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all"
              required
            />
          </div>
          
          
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Password
              </label>
              <Link to="/forgot-password" className="text-[10px] font-black text-[#2D5A43] hover:underline uppercase tracking-widest">
                Lupa?
              </Link>
            </div>
            <InputField 
              icon={<Lock size={18} className="text-gray-400" />} 
              type="password" 
              name="password"
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all"
              required
            />
          </div>

          
          <div className="pt-4">
            <Button 
              type="submit"
              isLoading={isLoading} 
              text="MASUK SEKARANG" 
              className="w-full py-5 text-white"
            />
          </div>
        </form>

       
        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-400 font-medium">
            Belum punya akun?{' '}
            <Link to="/signup" className="text-[#2D5A43] font-black hover:underline tracking-tight ml-1">
              DAFTAR GRATIS
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;