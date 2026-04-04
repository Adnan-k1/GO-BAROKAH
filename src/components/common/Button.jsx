const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-[#3A5A4D] text-white hover:bg-[#2D5A43] shadow-lg shadow-green-900/10',
    outline: 'border border-gray-100 text-gray-500 hover:bg-gray-50',
    danger: 'text-red-300 hover:text-red-500'
  };

  return (
    <button 
      {...props}
      className={`flex items-center justify-center gap-2 rounded-2xl font-bold transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;