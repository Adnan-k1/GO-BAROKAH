import React from 'react';

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  variant = "default",
  ...props
}) => {
  const variants = {
    default: "bg-gray-50 border-gray-200 focus:border-[#2D5A43]",
    admin: "bg-white border-gray-300 focus:border-emerald-500"
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs font-semibold text-gray-500 mb-1">
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-xl border outline-none transition min-h-[100px] text-sm
          ${variants[variant]}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default FormTextarea;