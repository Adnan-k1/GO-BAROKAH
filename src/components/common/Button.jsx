import React from 'react';

const Button = ({ 
  children, 
  text, 
  variant = 'primary', 
  className = '', 
  isLoading = false, 
  ...props 
}) => {
  const variants = {
    primary: 'bg-[#2D5A43] text-white hover:bg-[#234735] shadow-lg shadow-green-900/20',
    outline: 'border-2 border-[#2D5A43] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-900/10'
  };

  return (
    <button 
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        flex items-center justify-center gap-3 rounded-2xl font-black text-xs uppercase tracking-[0.15em] 
        transition-all duration-300 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>MENGIRIM...</span>
        </div>
      ) : (
        text || children
      )}
    </button>
  );
};

export default Button;