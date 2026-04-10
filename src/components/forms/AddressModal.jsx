import React from 'react';
import { X } from 'lucide-react';
import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import Button from '../common/Button';

const AddressModal = ({ isOpen, onClose, onSubmit, formData, onChange, isEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-200">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Ubah Alamat' : 'Tambah Alamat Baru'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Label Alamat"
              name="label"
              value={formData.label ?? ''}
              onChange={onChange}
              required
            />
            <FormInput
              label="Nama Penerima"
              name="recipient_name"
              value={formData.recipient_name ?? ''}
              onChange={onChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="No. Telepon"
              name="recipient_phone"
              value={formData.recipient_phone ?? ''}
              onChange={onChange}
              required
            />
          </div>

          <FormTextarea
            label="Detail Alamat"
            name="address_detail"
            value={formData.address_detail ?? ''}
            onChange={onChange}
            required
          />

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              BATAL
            </button>
            <Button type="submit" className="flex-[2] py-4 shadow-lg">
              {isEdit ? 'SIMPAN PERUBAHAN' : 'TAMBAH ALAMAT'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;