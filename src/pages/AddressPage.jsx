import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, X } from 'lucide-react';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    label: '',
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = {
      ...formData,
      id: Date.now(),
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, newAddress]);
    setIsModalOpen(false);
    setFormData({ label: '', name: '', phone: '', address: '', city: '' });
  };

 
  const deleteAddress = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
      const updatedAddresses = addresses.filter(item => item.id !== id);
      
      
      if (updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
        updatedAddresses[0].isDefault = true;
      }
      
      setAddresses(updatedAddresses);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[500px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900">Alamat Saya</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#4B5E53] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3d4d44] transition-all"
        >
          <Plus size={18} /> Tambah Alamat
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-400">
          <MapPin size={48} className="mb-4 opacity-20" />
          <p>Belum ada alamat pengiriman.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((item) => (
            <div 
              key={item.id} 
              className={`p-6 rounded-2xl border-2 transition-all ${
                item.isDefault ? 'border-[#2D5A43]' : 'border-gray-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">{item.label}</span>
                  {item.isDefault && (
                    <span className="bg-gray-500 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-bold text-gray-800">{item.name}</p>
                <p>{item.phone}</p>
                <p>{item.address}, {item.city}</p>
              </div>

              
              <div className="mt-6 flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600">
                  <Edit2 size={14} /> Edit
                </button>
                <button 
                  onClick={() => deleteAddress(item.id)}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Tambah Alamat Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required name="label" placeholder="Label Alamat (Rumah/Kantor)" onChange={handleInputChange} className="w-full bg-gray-50 p-3 rounded-xl outline-none" />
              <input required name="name" placeholder="Nama Penerima" onChange={handleInputChange} className="w-full bg-gray-50 p-3 rounded-xl outline-none" />
              <input required name="phone" placeholder="No. Telepon" onChange={handleInputChange} className="w-full bg-gray-50 p-3 rounded-xl outline-none" />
              <textarea required name="address" placeholder="Alamat Lengkap" onChange={handleInputChange} className="w-full bg-gray-50 p-3 rounded-xl outline-none h-24 resize-none" />
              <input required name="city" placeholder="Kota / Kode Pos" onChange={handleInputChange} className="w-full bg-gray-50 p-3 rounded-xl outline-none" />
              <button type="submit" className="w-full py-4 bg-[#2D5A43] text-white rounded-2xl font-bold hover:bg-[#234735]">
                Simpan Alamat
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;