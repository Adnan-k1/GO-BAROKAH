import React from 'react';
import { useProfileLogic } from '../hooks/useProfileLogic';

const ProfileInfoPage = () => {
  const { user, nameParts } = useProfileLogic();

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold mb-8">Informasi Profil</h3>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Nama Depan</label>
            <input type="text" defaultValue={nameParts[0]} className="w-full bg-[#F3F5F7] rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#2D5A43] outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Nama Belakang</label>
            <input type="text" defaultValue={nameParts[1]} className="w-full bg-[#F3F5F7] rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#2D5A43] outline-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Email</label>
          <input type="email" defaultValue={user?.email} className="w-full bg-[#F3F5F7] rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#2D5A43] outline-none" />
        </div>
        <button type="submit" className="w-full md:w-auto px-10 py-4 bg-[#2D5A43] text-white rounded-xl font-bold hover:bg-[#234735] transition-all">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default ProfileInfoPage;