export default function ContactTextarea({
  name,
  value,
  onChange,
}) {
  return (
    <textarea
      name={name}
      rows="4"
      placeholder="Your Message"
      value={value}
      onChange={onChange}
      required
      className="w-full px-5 py-3 rounded-xl bg-white/5 
      border border-white/10 focus:border-indigo-500 
      outline-none transition"
    />
  );
}
