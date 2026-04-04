import React, { useState } from 'react';
import { Plus, Trash2, MapPin, Check, PencilLine, Star } from 'lucide-react';

import Button from '../components/common/Button';
import AddressModal from '../components/forms/AddressModal'; 

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ label: '', name: '', phone: '', address: '', city: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (item = null) => {
    if (item) {
      setEditId(item.id);
      setFormData({ ...item });
    } else {
      setEditId(null);
      setFormData({ label: '', name: '', phone: '', address: '', city: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setAddresses(addresses.map(addr => 
        addr.id === editId ? { ...formData, id: editId, isDefault: addr.isDefault } : addr
      ));
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now(), isDefault: addresses.length === 0 }]);
    }
    setIsModalOpen(false);
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const deleteAddress = (id) => {
    if (window.confirm('Hapus alamat ini?')) {
      const updated = addresses.filter(item => item.id !== id);
      if (updated.length > 0 && !updated.some(a => a.isDefault)) updated[0].isDefault = true;
      setAddresses(updated);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[600px]">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Alamat Saya</h3>
          <p className="text-sm text-gray-400 mt-1">Kelola alamat pengiriman pesanan Anda</p>
        </div>
        <Button onClick={() => openModal()} className="px-6 py-3 text-[14px]">
          <Plus size={18} /> Tambah Alamat
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <MapPin size={32} className="text-gray-200 mb-4" />
          <p>Belum ada alamat pengiriman.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {addresses.map((item) => (
            <div key={item.id} className={`p-6 rounded-[24px] border-2 transition-all ${item.isDefault ? 'border-[#2D5A43] bg-[#fdfdfd]' : 'border-gray-50 bg-white'}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="font-bold text-gray-900">{item.label}</span>
                {item.isDefault ? (
                  <span className="bg-[#2D5A43] text-white text-[10px] px-2.5 py-1 rounded-lg uppercase font-bold flex items-center gap-1">
                    <Check size={10} /> Utama
                  </span>
                ) : (
                  <button onClick={() => setDefaultAddress(item.id)} className="text-[11px] font-bold text-[#2D5A43] hover:underline flex items-center gap-1">
                    <Star size={12} /> Jadikan Utama
                  </button>
                )}
              </div>
              <div className="text-[14px] text-gray-500 space-y-1">
                <p className="font-bold text-gray-800">{item.name}</p>
                <p>{item.phone}</p>
                <p>{item.address}, {item.city}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-50 flex gap-4">
                <button onClick={() => openModal(item)} className="flex items-center gap-2 text-[13px] font-bold text-gray-600 hover:text-[#2D5A43]">
                  <PencilLine size={16} /> UBAH
                </button>
                <Button variant="danger" className="text-[13px] px-4" onClick={() => deleteAddress(item.id)}>
                   <Trash2 size={15} /> HAPUS
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddressModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleInputChange}
        isEdit={!!editId}
      />
    </div>
  );
};

export default AddressPage;