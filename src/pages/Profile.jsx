import React from 'react';
import { useProfileLogic } from '../hooks/useProfileLogic';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';

const ProfileInfoPage = () => {
  const { formData, handleChange, saveProfile } = useProfileLogic();

  const handleSaveProfile = (e) => {
    e.preventDefault();
    saveProfile();
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Informasi Profil</h3>
        <p className="text-sm text-gray-400 mt-1">Kelola informasi data diri Anda</p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSaveProfile}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput 
            label="Nama Depan"
            name="firstName"
            type="text"
            value={formData?.firstName || ''}
            onChange={handleChange}
            placeholder="Masukkan nama depan Anda"
            required
          />
          <FormInput 
            label="Nama Belakang"
            name="lastName"
            type="text"
            value={formData?.lastName || ''}
            onChange={handleChange}
            placeholder="Masukkan nama belakang Anda"
            required
          />
        </div>

        <FormInput 
          label="Email"
          name="email"
          type="email"
          value={formData?.email || ''}
          placeholder="Masukkan email Anda"
          required
          className="bg-gray-50 opacity-70 cursor-not-allowed"
        />

        <FormInput 
          label="Nomor Telepon"
          name="phone"
          type="text"          
          value={formData?.phone || ''}
          onChange={handleChange}
          placeholder="Contoh: 08123456789"
          required
        />

        <FormInput 
          label="Tanggal Lahir"
          name="birthDate"
          type="text"
          placeholder="dd/mm/yyyy"
          value={formData?.birthDate || ''}
          onChange={handleChange}
        />

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-50">
          <Button 
            type="button" 
            variant="outline" 
            className="px-10 py-3 text-sm"
            onClick={() => window.history.back()}
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            className="px-10 py-3 text-sm shadow-lg shadow-[#2D5A43]/10"
          >
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoPage;