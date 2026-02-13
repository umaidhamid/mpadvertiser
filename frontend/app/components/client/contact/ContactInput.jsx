export default function ContactInput({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-5 py-3 rounded-xl bg-white/5 
      border border-white/10 focus:border-indigo-500 
      outline-none transition"
    />
  );
}
