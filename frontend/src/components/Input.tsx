export function Input({
  onChange,
  placeholder,
}: {
  placeholder: string;
  onChange: () => void;
}) {
  return (
    <div>
      <input
        type={"text"}
        className="px-4 py-2 border rounded m-2 outline-none border-gray-400"
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
