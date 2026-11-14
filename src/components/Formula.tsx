import katex from "katex";
import "katex/dist/katex.min.css";
export default function Formula({ value }: { value: string }) {
  return (
    <div
      className="formula"
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(value, {
          displayMode: true,
          throwOnError: false,
          trust: false,
          output: "htmlAndMathml",
        }),
      }}
    />
  );
}
