import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  isLoading = false,
  ...props
}) => {

  const variants = {
    primary: 'bg-[#2D5A43] text-white hover:bg-[#234735]',
    outline: 'border border-[#2D5A43] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',

    // 🔥 TAMBAHAN (buat admin)
    admin: 'bg-emerald-600 text-white hover:bg-emerald-700'
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        flex items-center justify-center gap-2 rounded-lg font-semibold
        transition-all duration-200 active:scale-95
        disabled:opacity-70 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;