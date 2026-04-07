import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft } from "lucide-react"; 
import { authService } from "../services/authService";
import InputField from "../components/common/FormInput";
import Button from "../components/common/Button"; 

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.register(formData);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            Buat <span className="text-[#2D5A43]">Akun.</span>
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">
            Gabung bersama komunitas UD Barokah untuk pengalaman belanja organik terbaik.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Full Name
            </label>
            <InputField 
              icon={<User size={18} className="text-gray-400" />} 
              type="text" 
              name="name"
              placeholder="Nama Lengkap Anda" 
              value={formData.name} 
              onChange={handleChange} 
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Email Address
            </label>
            <InputField 
              icon={<Mail size={18} className="text-gray-400" />} 
              type="email" 
              name="email"
              placeholder="user@example.com" 
              value={formData.email} 
              onChange={handleChange} 
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
              Password
            </label>
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
              text="DAFTAR SEKARANG" 
              className="w-full py-5 text-white shadow-lg shadow-green-900/10"
            />
          </div>
        </form>
        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
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

export default SignUp;