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
      className="
        w-full px-5 py-3 rounded-xl
        bg-background
        border border-border
        text-foreground
        placeholder:text-muted
        focus:ring-2 focus:ring-primary
        outline-none transition
      "
    />
  );
}