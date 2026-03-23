import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    try {
      authService.register(formData);
      alert("Akun berhasil dibuat! Silahkan login.");
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Buat Akun</h2>
          <p className="text-gray-400 text-sm mt-2">Gabung bersama komunitas UD. BAROKAH</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Nama Lengkap"
              className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 focus:border-[#2D5A43] focus:bg-white outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

         
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email"
              className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 focus:border-[#2D5A43] focus:bg-white outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

         
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Buat Password"
              className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl py-4 pl-12 pr-4 focus:border-[#2D5A43] focus:bg-white outline-none transition-all text-sm"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 mt-4">
            Daftar Sekarang <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 italic">
          Sudah punya akun? <Link to="/login" className="text-[#2D5A43] font-bold hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;