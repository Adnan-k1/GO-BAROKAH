import { X } from 'lucide-react';
import Button from '../common/Button';
import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';

const AddressModal = ({ isOpen, onClose, onSubmit, formData, onChange, isEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-6">
      <div className="bg-white w-full max-w-[520px] max-h-[90vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-8 pb-4 border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Ubah Alamat' : 'Tambah Alamat Baru'}
          </h3>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto p-8 pt-6">
          <form onSubmit={onSubmit} className="space-y-5">
            <FormInput 
              label="Label Alamat" 
              name="label" 
              value={formData.label} 
              required 
              onChange={onChange} 
              placeholder="Contoh: Rumah, Kantor"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormInput 
                label="Nama Penerima" 
                name="name" 
                value={formData.name} 
                required 
                onChange={onChange} 
              />
              <FormInput 
                label="No. Telepon" 
                name="phone" 
                value={formData.phone} 
                required 
                onChange={onChange} 
              />
            </div>

            <FormTextarea 
              label="Alamat Lengkap" 
              name="address" 
              value={formData.address} 
              required 
              onChange={onChange} 
            />
            
            <FormInput 
              label="Kota / Kode Pos" 
              name="city" 
              value={formData.city} 
              required 
              onChange={onChange} 
            />
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 py-4" 
                onClick={onClose}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="flex-[2] py-4"
              >
                {isEdit ? 'Simpan Perubahan' : 'Simpan Alamat'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;