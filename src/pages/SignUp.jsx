import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { authService } from "../services/authService";
import InputField from "../components/common/FormInput";
import SubmitButton from "../components/common/Button";

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
      alert("Akun berhasil dibuat! Silahkan login.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#2D5A43]">Buat Akun</h2>
          <p className="text-gray-400 text-sm mt-2">Gabung bersama komunitas UD. BAROKAH</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <InputField icon={<User />} type="text" name="name" placeholder="Nama Lengkap" onChange={handleChange} />
          <InputField icon={<Mail />} type="email" name="email" placeholder="Email Anda" onChange={handleChange} />
          <InputField icon={<Lock />} type="password" name="password" placeholder="Buat Password" onChange={handleChange} />
          
          <SubmitButton isLoading={isLoading} text="Daftar Sekarang" />
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Sudah punya akun? <Link to="/login" className="text-[#2D5A43] font-bold hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;