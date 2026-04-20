import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FormInput from "../common/FormInput";
import FormTextarea from "../common/FormTextarea";
import Button from "../common/Button";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const AddressModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  isEdit,
}) => {
  const [position, setPosition] = useState([-2.689, 111.621]);

  useEffect(() => {
    if (isOpen && isEdit && formData.address_detail) {
      handleSearchLocation(formData.address_detail);
    }
  }, [isOpen]);

  const fetchAddressName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      );
      const data = await response.json();
      if (data.display_name) {
        onChange({
          target: { name: "address_detail", value: data.display_name },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        fetchAddressName(e.latlng.lat, e.latlng.lng);
      },
    });
    return <Marker position={position} />;
  };

  const handleSearchLocation = async (text) => {
    if (!text || text.length < 5) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}`,
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const RecenterMap = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], 15);
    }, [lat, lng]);
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white shrink-0">
          <h3 className="text-xl font-bold text-gray-900">
            {isEdit ? "Ubah Alamat" : "Tambah Alamat Baru"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-8 space-y-6 overflow-y-auto flex-grow text-left"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Label Alamat"
              name="label"
              placeholder="Rumah / Kantor"
              value={formData.label ?? ""}
              onChange={onChange}
              required
            />
            <FormInput
              label="Nama Penerima"
              name="recipient_name"
              value={formData.recipient_name ?? ""}
              onChange={onChange}
              placeholder={"Masukkan nama penerima"}
              required
            />
          </div>

          <FormInput
            label="No. Telepon"
            name="recipient_phone"
            value={formData.recipient_phone ?? ""}
            onChange={onChange}
            placeholder={"Masukkan nomor telepon anda"}
            required
          />
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex justify-between">
              Titik Lokasi
              <span className="text-[10px] lowercase font-medium text-[#2D5A43]">
                Klik peta untuk geser pin
              </span>
            </label>
            <div className="h-48 w-full rounded-2xl overflow-hidden border border-gray-100 z-0">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  attribution="&copy; CARTO"
                />
                <LocationPicker />
                <RecenterMap lat={position[0]} lng={position[1]} />
              </MapContainer>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-left block">
              Detail Alamat
            </label>
            <div className="relative group">
              <FormTextarea
                name="address_detail"
                value={formData.address_detail ?? ""}
                onChange={onChange}
                onBlur={(e) => handleSearchLocation(e.target.value)}
                placeholder="Jl. Nama Jalan, No. Rumah..."
                className="pr-12"
                required
              />
              <button
                type="button"
                onClick={() => handleSearchLocation(formData.address_detail)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#2D5A43] transition-colors bg-gray-50 rounded-xl"
                title="Cari lokasi di peta"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-gray-400 uppercase text-xs tracking-widest"
            >
              Batal
            </button>
            <Button
              type="submit"
              className="flex-[2] py-4 shadow-lg uppercase text-xs tracking-widest"
            >
              {isEdit ? "Simpan Perubahan" : "Tambah Alamat"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
