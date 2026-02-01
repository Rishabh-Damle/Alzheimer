interface InputProps {
  placeholder: string;
  reference: any;
  type?: "text" | "password";
}
export function Input({ placeholder, reference, type = "text" }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={reference}
        type={type}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        placeholder={placeholder}
      />
    </div>
  );
}
