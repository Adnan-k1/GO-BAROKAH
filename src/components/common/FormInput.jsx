import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  required, 
  placeholder, 
  type = "text", 
  icon, 
  rightIcon, 
  className,
  readOnly = false 
}) => (
  <div className="flex flex-col gap-1 relative group">
    {label && (
      <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1 mb-1">
        {label}
      </label>
    )}
    
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2D5A43] transition-colors">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value ?? ''}      
        onChange={onChange}      
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`w-full px-4 py-4 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5A43]/10 focus:bg-white focus:border-[#2D5A43]/20 transition-all font-medium 
          ${icon ? 'pl-12' : 'pl-4'} 
          ${rightIcon ? 'pr-12' : 'pr-4'} 
          ${className}`}
      />
      
      {rightIcon && (
        <div className="absolute inset-y-0 right-4 flex items-center">
          {rightIcon}
        </div>
      )}
    </div>
  </div>
);

export default FormInput;