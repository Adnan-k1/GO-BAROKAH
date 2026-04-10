import React, { useState } from 'react';
import { Plus, Trash2, PencilLine, Loader2 } from 'lucide-react';
import Button from '../components/common/Button';
import AddressModal from '../components/forms/AddressModal';
import { useAddressLogic } from '../hooks/useAddressLogic';

const AddressPage = () => {
  const { addresses, isLoading, handleSaveAddress, handleDeleteAddress } = useAddressLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    label: '',
    recipient_name: '',
    recipient_phone: '',
    address_detail: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (item = null) => {
    if (item) {
      setEditId(item.id);
      setFormData({
        label: item.label || '',
        recipient_name: item.recipientName || '',
        recipient_phone: item.recipientPhone || '',
        address_detail: item.addressDetail || ''
      });
    } else {
      setEditId(null);
      setFormData({
        label: '',
        recipient_name: '',
        recipient_phone: '',
        address_detail: ''
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 min-h-[500px]">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900">Alamat Saya</h3>
        <Button onClick={() => openModal()} className="px-6 py-3">
          <Plus size={18} /> TAMBAH ALAMAT
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#2D5A43]" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm">Belum ada alamat tersimpan</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {addresses.map((item) => (
            <div key={item.id} className="p-6 rounded-[24px] border border-gray-100 bg-gray-50/40">
              <div className="flex items-center gap-2">
                {item.label && (
                  <span className="text-[10px] font-black text-[#2D5A43] uppercase bg-green-50 px-2 py-1 rounded">
                    {item.label}
                  </span>
                )}
                {item.isDefault && (
                  <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">
                    Utama
                  </span>
                )}
              </div>
              <div className="mt-3 text-[14px]">
                <p className="font-bold text-gray-900">{item.recipientName}</p>
                <p className="text-gray-500">{item.recipientPhone}</p>
                <p className="text-gray-600 mt-1">{item.addressDetail}</p>
              </div>
              <div className="mt-5 flex gap-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openModal(item)}
                  className="text-xs font-bold text-gray-400 hover:text-[#2D5A43] flex items-center gap-1"
                >
                  <PencilLine size={14} /> UBAH
                </button>
                <button
                  onClick={() => handleDeleteAddress(item.id)}
                  className="text-xs font-bold text-red-300 hover:text-red-500 flex items-center gap-1"
                >
                  <Trash2 size={14} /> HAPUS
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (e) => {
          e.preventDefault();
          if (await handleSaveAddress(formData, editId)) setIsModalOpen(false);
        }}
        formData={formData}
        onChange={handleInputChange}
        isEdit={!!editId}
      />
    </div>
  );
};

export default AddressPage;