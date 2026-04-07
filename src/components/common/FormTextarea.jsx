const FormTextarea = ({ label, ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-[14px] font-semibold text-gray-700 ml-1">{label}</label>}
    <textarea 
      {...props}
      className="w-full bg-gray-50/50 border border-gray-200 p-4 rounded-2xl outline-none focus:border-[#2D5A43] focus:ring-1 focus:ring-[#2D5A43] h-28 resize-none text-[14px] transition-all placeholder:text-gray-300" 
    />
  </div>
);

export default FormTextarea;