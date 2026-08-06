import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileLogic } from '../../hooks/user/useProfileLogic';
import { User, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';

const ProfileInfoPage = () => {
  const navigate = useNavigate();
  const { user, formData, handleChange, saveProfile } = useProfileLogic();

  const phoneVerified = formData?.is_phone_verified === true;
  const hasPhone = Boolean(formData?.phone);
  const isPhoneChanged = (user?.phone_number || '') !== (formData?.phone || '');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    saveProfile();
  };

  const handleVerifyPhone = () => {
    navigate('/verify-phone', { state: { phone: formData.phone } });
  };

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          Informasi <span className="text-[#2D5A43]">Profil.</span>
        </h3>
        <p className="text-sm text-gray-400 mt-1 font-medium">Kelola informasi data diri Anda</p>
      </div>

      <form className="space-y-6 mt-6" onSubmit={handleSaveProfile}>
        <FormInput
          label="Nama Lengkap"
          name="username"
          type="text"
          value={formData?.username || ''}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap Anda"
          icon={<User size={18} className="text-gray-400" />}
          className="!py-3.5 !rounded-2xl !bg-gray-50 !border-gray-100 hover:!border-gray-200 focus:!bg-white focus:!border-[#2D5A43] focus:!ring-4 focus:!ring-[#2D5A43]/10 text-gray-900 font-bold transition-all"
          required
        />
        <FormInput
          label="Alamat Email"
          name="email"
          type="email"
          value={formData?.email || ''}
          placeholder="contoh@email.com"
          readOnly
          icon={<Mail size={18} className="text-gray-400" />}
          className="!py-3.5 !rounded-2xl !bg-gray-100 !border-gray-200 text-gray-500 font-bold cursor-not-allowed opacity-80"
          required
        />
        <div>
          <FormInput
            label="Nomor Telepon"
            name="phone"
            type="text"
            value={formData?.phone || ''}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                handleChange(e);
              }
            }}
            placeholder="Contoh: 08123456789"
            icon={<Phone size={18} className="text-gray-400" />}
            className="!py-3.5 !rounded-2xl !bg-gray-50 !border-gray-100 hover:!border-gray-200 focus:!bg-white focus:!border-[#2D5A43] focus:!ring-4 focus:!ring-[#2D5A43]/10 text-gray-900 font-bold transition-all"
            rightIcon={
              hasPhone && isPhoneChanged ? (
                <button
                  type="button"
                  disabled
                  title="Simpan perubahan terlebih dahulu"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-gray-200 text-gray-400 cursor-not-allowed transition-all shadow-sm"
                >
                  Verifikasi
                  <ArrowRight size={12} />
                </button>
              ) : hasPhone && !phoneVerified ? (
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-[#2D5A43] text-white hover:bg-[#234735] transition-all active:scale-95 shadow-sm"
                >
                  Verifikasi
                  <ArrowRight size={12} />
                </button>
              ) : hasPhone && phoneVerified ? (
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <ShieldCheck size={12} />
                  Terverifikasi
                </div>
              ) : null
            }
            required
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-6 border-t border-gray-50">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto px-10 py-3 text-sm"
            onClick={() => window.history.back()}
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto px-10 py-3 text-sm shadow-lg shadow-[#2D5A43]/10"
          >
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoPage;