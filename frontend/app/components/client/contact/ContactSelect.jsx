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
      className="
        w-full px-5 py-3 rounded-xl
        bg-background
        border border-border
        text-foreground
        focus:ring-2 focus:ring-primary
        outline-none transition
      "
    >
      <option value="">Select Service</option>

      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
