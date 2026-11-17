export default function MasteryLights({ level }: { level: number }) {
  return (
    <span className="fm-lights" role="img" aria-label={`掌握度 ${level} / 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true" data-lit={index < level} />
      ))}
    </span>
  );
}
