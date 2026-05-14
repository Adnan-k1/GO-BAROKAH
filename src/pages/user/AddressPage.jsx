import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  PencilLine,
  Loader2,
  Home,
  Briefcase,
  Map,
  Phone,
  User,
} from "lucide-react";
import AddressModal from "../../components/forms/AddressModal";
import ConfirmModal from "../../components/forms/ConfirmModal"; 
import { useAddressLogic } from "../../hooks/user/useAddressLogic";

const AddressPage = () => {
  const {
    addresses,
    isLoading,
    handleSaveAddress,
    handleDeleteAddress,
    handleSetDefault,
  } = useAddressLogic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    addressId: null,
  });

  const [formData, setFormData] = useState({
    label: "",
    recipient_name: "",
    recipient_phone: "",
    address_detail: "",
    is_default: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLabelIcon = (label) => {
    const l = label?.toLowerCase() || "";
    if (l.includes("rumah")) return <Home size={14} className="md:size-[16px]" />;
    if (l.includes("kantor")) return <Briefcase size={14} className="md:size-[16px]" />;
    return <Map size={14} className="md:size-[16px]" />;
  };

  const openModal = (item = null) => {
    if (item) {
      setEditId(item.id || item._id);
      setFormData({
        label: item.label || "",
        recipient_name: item.recipientName || item.recipient_name || "", 
        recipient_phone: item.recipientPhone || item.recipient_phone || "",
        address_detail: item.addressDetail || item.address_detail || "",
        is_default: item.isDefault || false,
      });
    } else {
      setEditId(null);
      setFormData({
        label: "",
        recipient_name: "",
        recipient_phone: "",
        address_detail: "",
        is_default: false,
      });
    }
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (id) => {
    setDeleteModal({ isOpen: true, addressId: id });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.addressId) {
      await handleDeleteAddress(deleteModal.addressId);
      setDeleteModal({ isOpen: false, addressId: null });
    }
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-[32px] p-5 md:p-8 border border-gray-100 shadow-sm min-h-[500px] md:min-h-[600px]">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 md:mb-10">
        <div className="max-w-md">
          <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase italic">
            Alamat <span className="text-[#3A5A4D]">Pengiriman.</span>
          </h3>
          <p className="text-[11px] md:text-sm text-gray-400 mt-1 font-bold uppercase tracking-widest">
            Atur lokasi pengiriman pesanan Anda.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#3A5A4D] hover:bg-[#2D463C] text-white px-6 py-4 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-green-900/10"
        >
          <Plus size={16} strokeWidth={3} /> TAMBAH ALAMAT
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {isLoading ? (
          <div className="flex justify-center py-32 md:py-40">
            <Loader2 className="animate-spin text-[#3A5A4D]" size={32} />
          </div>
        ) : addresses.length > 0 ? (
          addresses.map((item) => {
            const itemId = item.id || item._id;
            const isDefault = item.isDefault || item.is_default || false;

            return (
              <div
                key={itemId}
                className={`group relative border rounded-2xl md:rounded-[24px] p-5 md:p-6 transition-all duration-300 ${
                  isDefault
                    ? "border-[#3A5A4D] bg-[#FDFDFD] shadow-md shadow-green-900/5"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap justify-between items-start mb-5 gap-2">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div
                      className={`p-1.5 md:p-2 rounded-lg md:rounded-xl ${isDefault ? "bg-[#3A5A4D] text-white" : "bg-gray-100 text-gray-500"}`}
                    >
                      {getLabelIcon(item.label)}
                    </div>
                    <span className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      {item.label || "Alamat"}
                    </span>
                    {isDefault && (
                      <span className="bg-[#E8F5EE] text-[#3A5A4D] text-[8px] md:text-[9px] px-2 md:px-3 py-1 rounded-md md:rounded-lg font-black uppercase tracking-tighter">
                        Utama
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="px-0 md:px-1 py-1 space-y-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <User size={14} className="text-[#3A5A4D] opacity-40 shrink-0 md:size-[16px]" />
                    <span className="text-[14px] md:text-[15px] font-black text-slate-900 uppercase tracking-tight italic">
                      {item.recipientName || "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <Phone size={14} className="text-[#3A5A4D] opacity-40 shrink-0 md:size-[16px]" />
                    <span className="text-[12px] md:text-[14px] text-slate-600 font-bold tracking-tight">
                      {item.recipientPhone || "-"}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <MapPin size={14} className="text-[#3A5A4D] opacity-40 shrink-0 mt-0.5 md:size-[16px]" />
                    <span className="text-[12px] md:text-[14px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">
                      {item.addressDetail || "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center pt-5 mt-4 border-t border-gray-100 gap-4">
                  <div>
                    {!isDefault && (
                      <button
                        onClick={() => handleSetDefault(itemId)}
                        className="text-[9px] md:text-[10px] text-gray-400 hover:text-[#3A5A4D] font-black uppercase tracking-[0.15em] transition-colors"
                      >
                        Set Utama
                      </button>
                    )}
                  </div>

                  <div className="flex gap-1 md:gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="p-2 md:p-2.5 text-gray-400 hover:text-[#3A5A4D] hover:bg-emerald-50 rounded-lg md:rounded-xl transition-all"
                      title="Edit"
                    >
                      <PencilLine size={16} className="md:size-[18px]" />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(itemId)}
                      className="p-2 md:p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg md:rounded-xl transition-all"
                      title="Hapus"
                    >
                      <Trash2 size={16} className="md:size-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 px-6 border-2 border-dashed border-gray-100 rounded-3xl">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
               <MapPin size={32} className="text-gray-200" />
            </div>
            <h4 className="text-lg font-black text-gray-900 uppercase italic">Kosong</h4>
            <p className="text-[11px] text-gray-400 mt-2 max-w-[220px] font-bold uppercase tracking-widest leading-relaxed">
              Tambahkan lokasi pengiriman agar checkout lebih cepat.
            </p>
          </div>
        )}
      </div>

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
        isLoading={isLoading}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, addressId: null })}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
        title="HAPUS ALAMAT?"
        message="Data yang dihapus tidak dapat dikembalikan. Lanjutkan?"
      />
    </div>
  );
};

export default AddressPage;