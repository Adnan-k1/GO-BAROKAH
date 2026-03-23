import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useLoginLogic } from '../hooks/useLoginLogic';

const Login = () => {
  const { formData, handleChange, handleLogin } = useLoginLogic();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        
        <LoginHeader />

        <form onSubmit={handleLogin} className="space-y-6">
          <InputField 
            icon={<Mail />} 
            type="email" 
            name="email"
            placeholder="Email Anda" 
            value={formData.email} 
            onChange={handleChange} 
          />
          
          <InputField 
            icon={<Lock />} 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
          />

          <SubmitButton />
        </form>

        <LoginFooter />
      </div>
    </div>
  );
};



const LoginHeader = () => (
  <div className="text-center mb-10">
    <h2 className="text-3xl font-extrabold text-[#2D5A43]">Selamat Datang</h2>
    <p className="text-gray-400 text-sm mt-2">Masuk untuk belanja bahan organik</p>
  </div>
);

const InputField = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <input 
      {...props}
      required
      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 focus:border-[#2D5A43] outline-none text-sm transition-all"
    />
  </div>
);

const SubmitButton = () => (
  <button type="submit" className="w-full bg-[#2D5A43] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#234735] transition-all active:scale-95 shadow-lg shadow-green-900/10">
    Masuk Sekarang <ArrowRight className="w-4 h-4" />
  </button>
);

const LoginFooter = () => (
  <p className="text-center mt-8 text-sm text-gray-500">
    Belum punya akun? <Link to="/signup" className="text-[#2D5A43] font-bold hover:underline">Daftar Gratis</Link>
  </p>
);

export default Login;