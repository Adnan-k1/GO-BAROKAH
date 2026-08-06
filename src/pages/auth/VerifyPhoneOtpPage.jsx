import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { KeyRound, ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";
import authService from "../../services/auth/authService";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/common/FormInput";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";

const VerifyPhoneOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useAuth();
  const phone = location.state?.phone || localStorage.getItem("pendingVerificationPhone") || "";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);
  const sentRef = useRef(false);

  useEffect(() => {
    if (!phone) {
      toast.error("Silakan isi nomor telepon terlebih dahulu.");
      navigate("/profile");
      return;
    }
    localStorage.setItem("pendingVerificationPhone", phone);
  }, [phone, navigate]);

  useEffect(() => {
    if (phone && !sentRef.current) {
      sentRef.current = true;
      handleResendOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const handleResendOTP = async () => {
    setIsResending(true);
    setError(null);
    try {
      await authService.requestPhoneOTP();
      toast.success("Kode OTP telah dikirim ke WhatsApp!", {
        style: { background: "#2D5A43", color: "#fff" },
      });
    } catch (err) {
      const msg = err.response?.data?.message || "Gagal mengirim kode OTP.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authService.verifyPhoneOTP(otp);
      localStorage.removeItem("pendingVerificationPhone");
      updateUser({ ...user, is_phone_verified: true });
      toast.success("Nomor Telepon Berhasil Diverifikasi!", {
        style: { background: "#2D5A43", color: "#fff" },
      });
      navigate("/profile");
    } catch (err) {
      const msg = err.response?.data?.message || "OTP Salah atau Kadaluwarsa";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB] px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/60 border border-gray-100 animate-in fade-in zoom-in duration-500">
        <div className="mb-10">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[#2D5A43] transition-all tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> KEMBALI KE PROFIL
          </Link>
        </div>

        <div className="text-left mb-10">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            Verifikasi <span className="text-[#2D5A43]">WhatsApp.</span>
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">
            Masukkan 6 digit kode yang dikirim ke nomor{" "}
            <span className="text-gray-800 font-bold">{phone || "WhatsApp kamu"}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold rounded-r-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <InputField
            label="KODE OTP"
            icon={<KeyRound size={18} />}
            type="text"
            placeholder="••••••"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            required
            className="text-center tracking-[0.5em] text-2xl font-black"
            maxLength={6}
            inputMode="numeric"
          />

          <Button
            type="submit"
            isLoading={isLoading}
            text="VERIFIKASI SEKARANG"
            className="w-full py-5 text-white shadow-lg shadow-green-900/10 active:scale-[0.98] transition-all font-black tracking-widest bg-[#2D5A43]"
          />
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
            Tidak menerima kode?{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending}
              className={`text-[#2D5A43] hover:underline ml-1 font-black inline-flex items-center gap-1 ${isResending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isResending ? <RefreshCw size={12} className="animate-spin" /> : null}
              {isResending ? "MENGIRIM..." : "KIRIM ULANG"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneOtp;
