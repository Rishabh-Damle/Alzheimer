export function InputBox({ onChange, placeholder }: { onChange: () => void }) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 border rounded m-2"
        onChange={onChange}
      />
    </div>
  );
}
