const FormInput = ({ label, icon, name, value, onChange, ...props }) => (
  <div className="space-y-2">
    {label && (
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
        {label}
      </label>
    )}

    <div className="relative flex items-center">
      {icon && <div className="absolute left-4 z-10">{icon}</div>}

      <input
        name={name}           
        value={value}         
        onChange={onChange}   
        {...props}           
        className={`w-full bg-gray-50/50 border border-gray-200 p-4 ${
          icon ? 'pl-12' : 'pl-4'
        } rounded-2xl outline-none focus:border-[#2D5A43] focus:ring-1 focus:ring-[#2D5A43] text-[14px] transition-all placeholder:text-gray-300 ${
          props.className || ''
        }`}
      />
    </div>
  </div>
);

export default FormInput;