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
      className="
        w-full px-5 py-3 rounded-xl
        bg-background
        border border-border
        text-foreground
        placeholder:text-muted
        focus:ring-2 focus:ring-primary
        outline-none transition resize-none
      "
    />
  );
}
