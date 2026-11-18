// Public-domain collection images from the Art Institute of Chicago. IDs match museum records.
const collection = [
  { id: 16568, title: "睡莲", year: "1906" },
  { id: 14620, title: "普尔维尔的悬崖漫步", year: "1882" },
  { id: 4783, title: "吉维尼的罂粟花田", year: "1890–91" },
  { id: 81537, title: "博尔迪盖拉", year: "1884" },
  { id: 14624, title: "麦垛：秋日黄昏", year: "1890–91" },
  { id: 16564, title: "雾中的塞纳河支流", year: "1897" },
  { id: 14598, title: "圣阿德雷斯的海滩", year: "1867" },
  { id: 16584, title: "伦敦议会大厦", year: "1900–01" },
];

export default function ChapterPainting({ chapter, cover = false }: { chapter: number; cover?: boolean }) {
  const work = collection[chapter - 1];
  if (!work) return null;
  const image = <img src={`${import.meta.env.BASE_URL}art/${work.id}.jpg`} alt="" loading={cover ? "eager" : "lazy"} />;
  return cover ? (
    <figure className="painting-cover">
      {image}
      <figcaption>莫奈《{work.title}》 · {work.year}</figcaption>
    </figure>
  ) : <span className="painting-study" aria-hidden="true">{image}</span>;
}
