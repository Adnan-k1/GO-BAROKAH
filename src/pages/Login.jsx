import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useLoginLogic } from '../hooks/useLoginLogic';
import InputField from '../components/common/FormInput';
import SubmitButton from '../components/common/Button';

const Login = () => {
  const { formData, handleChange, handleLogin, isLoading } = useLoginLogic();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#2D5A43]">Selamat Datang</h2>
          <p className="text-gray-400 text-sm mt-2">Masuk untuk belanja bahan organik</p>
        </div>

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

          <SubmitButton 
            isLoading={isLoading} 
            text="Masuk Sekarang" 
          />
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Belum punya akun? <Link to="/signup" className="text-[#2D5A43] font-bold hover:underline">Daftar Gratis</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;