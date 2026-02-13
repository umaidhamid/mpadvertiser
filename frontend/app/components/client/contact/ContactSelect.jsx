export default function ContactSelect({
  name,
  value,
  onChange,
  options,
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-5 py-3 rounded-xl bg-white/5 
      border border-white/10 focus:border-indigo-500 
      outline-none transition"
    >
      <option value="" className="bg-black">Select Service</option>
      {options.map((opt, i) => (
        <option key={i} value={opt} className="bg-black">
          {opt}
        </option>
      ))}
    </select>
  );
}
