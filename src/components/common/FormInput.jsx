const FormInput = ({ label, name, value, onChange, required, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value ?? ''}      
      onChange={onChange}      
      required={required}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/20"
    />
  </div>
);


export default FormInput;