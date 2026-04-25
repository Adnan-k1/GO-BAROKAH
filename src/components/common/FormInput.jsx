import React from 'react';

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon,
  rightIcon,
  className = "",
  variant = "default", 
  ...props
}) => {

  const variants = {
    default: "bg-gray-50 border-gray-200 focus:border-[#2D5A43]",
    admin: "bg-white border-gray-300 focus:border-emerald-500"
  };

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label className="text-xs font-semibold text-gray-500 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          className={`
            w-full px-4 py-2 rounded-lg border outline-none transition
            ${icon ? 'pl-10' : ''}
            ${variants[variant]}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;