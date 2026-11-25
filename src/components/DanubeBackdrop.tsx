export default function DanubeBackdrop({ theme }: { theme: "light" | "dark" }) {
  const file = theme === "dark" ? "danube-night.webp" : "danube-day.webp";
  return (
    <div className="danube-backdrop" aria-hidden="true">
      <img src={`${import.meta.env.BASE_URL}art/${file}`} alt="" decoding="async" />
    </div>
  );
}
