import { errorTags, type ErrorTag } from "./engine";
export default function TagPicker({
  tags,
  setTags,
}: {
  tags: ErrorTag[];
  setTags: (t: ErrorTag[]) => void;
}) {
  return (
    <fieldset>
      <legend>错因（可多选，也可跳过）</legend>
      {Object.entries(errorTags).map(([key, label]) => (
        <label className="fm-tag" key={key}>
          <input
            type="checkbox"
            checked={tags.includes(key as ErrorTag)}
            onChange={() =>
              setTags(
                tags.includes(key as ErrorTag)
                  ? tags.filter((t) => t !== key)
                  : [...tags, key as ErrorTag],
              )
            }
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
