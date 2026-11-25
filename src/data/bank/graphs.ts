import type { PracticeGraph } from "../learning";

/**
 * 含函数曲线回调（JS 函数）的 30 道作图/读图题图形配置，
 * 因 JSON 无法序列化函数回调，统一集中存放于此并由 ????? 按题号注入。
 */
const functionGraph: PracticeGraph = {
  bounds: [-5.2, 4.7, -3.3, 4.1],
  branches: [[-5.2, -3, (x) => 2 * x + 8], [-3, -1, (x) => -2 * x - 4], [-1, 1, () => -2], [1, 4.7, () => 3]],
  points: [[-3, 2, false], [1, -2, false], [1, 3, false], [1, 0, true]],
  ticks: { x: [-3, -1, 1], y: [-2, 2, 3] },
  description: "函数 f 的图像。负三处为高度二的空心点，两侧斜线接近它。负一处折到高度负二的水平线。横坐标一处左段高度负二、右段高度三，实心点在横轴上。",
};

const isolatedPointGraph: PracticeGraph = {
  bounds: [-3, 5, -3.3, 4.1],
  branches: [[-2, 0, (x) => x], [0, 2, (x) => -x], [2, 4, (x) => x - 2]],
  points: [[-2, -2, false], [0, 0, false], [0, 3, true], [2, -2, false], [2, 0, true], [4, 2, false]],
  ticks: { x: [-2, 2, 4], y: [-2, 2, 3] },
  description: "函数 g 的图像。负二至零为上升直线，零至二为下降直线，都经过原点的空心点。零处另有高度三的实心点。二处从高度负二跳到零，然后右侧直线向上。",
};

const endpointGraph: PracticeGraph = {
  bounds: [-3.2, 5.2, -1.4, 5],
  branches: [[-2, 2, (x) => x ** 2 / 2 + 1], [2, 4, () => 0]],
  points: [[-2, 3, false], [0, 1, false], [0, 4, true], [2, 3, false], [2, 0, true], [4, 0, true]],
  ticks: { x: [-2, 2, 4], y: [1, 3, 4] },
  description: "函数 h 的图像。负二至二之间为抛物线，两端的空心点高度三，中间的空心点高度一，零处另有高度四的实心点。横坐标二到四的水平线在横轴上，两端实心。图的外侧没有定义。",
};

export const problemQuestionGraphsById: Readonly<Record<string, PracticeGraph>> = {
  "jc935-1-3-1-1": functionGraph,
  "jc935-1-3-1-2": functionGraph,
  "jc935-1-3-1-3": functionGraph,
  "jc935-1-3-2-1": isolatedPointGraph,
  "jc935-1-3-2-2": isolatedPointGraph,
  "jc935-1-3-2-3": isolatedPointGraph,
  "jc935-1-3-2-4": isolatedPointGraph,
  "jc935-1-3-2-5": isolatedPointGraph,
  "jc935-1-3-2-6": isolatedPointGraph,
  "jc935-1-3-3-1": endpointGraph,
  "jc935-1-3-3-2": endpointGraph,
  "jc935-1-3-3-3": endpointGraph,
  "jc935-1-3-3-4": endpointGraph,
  "jc935-1-3-3-5": endpointGraph,
  "jc935-1-3-3-6": endpointGraph,
  "jc935-1-3-3-7": endpointGraph,
  "jc935-1-3-3-8": endpointGraph,
  "jc935-1-8-1": {
    bounds: [-5, 5, -3.1, 4.8],
    branches: [
      [-4, -2, (x) => x + 2],
      [-2, 0, (x) => x + 2],
      [0, 1, (x) => x],
      [1, 3, (x) => 2 - Math.abs(x - 2)],
      [3, 4, (x) => 4 - x],
    ],
    points: [
      [-4, -2, true],
      [-2, 0, false],
      [0, 2, false],
      [0, 0, true],
      [1, 1, false],
      [1, 4, true],
      [3, 1, false],
      [4, 0, true],
    ],
    ticks: { x: [-4, -2, 1, 3, 4], y: [-2, 1, 2, 4] },
    description:
      "图在负四到零的左侧沿斜线上升，负二处有空心点，零左侧高度二。零处有高度零的实心点，右侧三角形在横坐标一和三处都有高度一的空心点，横坐标一另有高度四的实心点。",
  },
};

export const problemGraphsById: Readonly<Record<string, PracticeGraph>> = {
  "jc935-1-1-3": {
    bounds: [-3, 3, -0.3, 1.3],
    branches: [
      [-3, -Math.PI / 2, () => 0],
      [-Math.PI / 2, Math.PI / 2, (x) => Math.abs(Math.sin(x))],
      [Math.PI / 2, 3, () => 0],
    ],
    points: [
      [-Math.PI / 2, 1, false],
      [Math.PI / 2, 1, false],
      [-Math.PI / 2, 0, true],
      [Math.PI / 2, 0, true],
    ],
    description: "两侧为零轴，中间为绝对值正弦曲线。分界点在高度一处空心，在零处实心。",
  },
  "jc935-1-1-14-1": {
    bounds: [-3, 4, -2.7, 2.6],
    branches: [
      [-3, 1, () => 2],
      [1, 4, () => -2],
    ],
    points: [
      [1, 2, false],
      [1, -2, false],
      [1, 1, true],
    ],
    description: "横坐标一左侧高度二，右侧高度负二，在一处的高度为一。",
  },
  "jc935-1-1-14-2": {
    bounds: [-4, 4, -0.6, 4.8],
    branches: [
      [-4, -2, () => 0.25],
      [-2, 2, () => 4],
      [2, 4, () => 0.25],
    ],
    points: [
      [-2, 4, false],
      [2, 4, false],
      [-2, 0.25, false],
      [2, 0.25, false],
      [-2, 2, true],
      [2, 2, true],
    ],
    description: "负二和二之间高度四，外侧高度四分之一，两个分界点取高度二。",
  },
  "jc935-1-8-2-1": {
    bounds: [-0.6, 6.7, -0.65, 4.8],
    branches: [
      [0, 2, (x) => x * x],
      [2, 6, (x) => 6 - x],
    ],
    points: [
      [0, 0, true],
      [2, 4, true],
      [6, 0, true],
    ],
    ticks: { x: [2, 6], y: [4] },
    description: "从原点到横坐标二是上升的抛物线，之后折成下降直线到横坐标六，接点高度四。",
  },
  "jc935-1-8-2-2": {
    bounds: [-4, 4, -1.8, 3.9],
    branches: [
      [-4, -2, () => 3],
      [-2, 2, (x) => x + 1],
      [2, 4, () => 3],
    ],
    points: [
      [-2, 3, false],
      [-2, -1, true],
      [2, 3, true],
    ],
    ticks: { x: [-2, 2], y: [-1, 3] },
    description:
      "左侧水平线高度三，到负二为空心点。中段斜线从负二、负一的实心点向右上升，在二处与高度三的右侧横线相接。",
  },
  "jc935-1-review-6-1": {
    bounds: [-3.3, 3.3, -0.25, 1.25],
    branches: [[-Math.PI, Math.PI, (x) => Math.abs(Math.sin(2 * x))]],
    ticks: {
      x: [-Math.PI, -Math.PI / 2, Math.PI / 2, Math.PI],
      y: [1],
      xLabels: { [-Math.PI]: "−π", [-Math.PI / 2]: "−π/2", [Math.PI / 2]: "π/2", [Math.PI]: "π" },
    },
    description: "正弦的负半波被翻到横轴上方，相邻零点相隔二分之π，每段中间的峰高为一。",
  },
  "jc935-1-review-6-2": {
    bounds: [-3.3, 3.3, -1.25, 1.25],
    branches: [[-Math.PI, Math.PI, (x) => Math.sin(2 * Math.abs(x))]],
    ticks: {
      x: [-Math.PI, Math.PI],
      y: [-1, 1],
      xLabels: { [-Math.PI]: "−π", [Math.PI]: "π" },
    },
    description: "右半边是一条正弦曲线，左半边关于纵轴镜像，正负半波都保留。",
  },
  "jc935-1-review-6-3": {
    bounds: [-0.8, 6 * Math.PI + 0.8, -3.8, 3.8],
    branches: [[0, 6 * Math.PI, (x) => 3 * Math.sin(x / 3)]],
    ticks: {
      x: [3 * Math.PI, 6 * Math.PI],
      y: [-3, 3],
      xLabels: { [3 * Math.PI]: "3π", [6 * Math.PI]: "6π" },
    },
    points: [
      [0, 0, true],
      [(3 * Math.PI) / 2, 3, true],
      [(9 * Math.PI) / 2, -3, true],
      [6 * Math.PI, 0, true],
    ],
    description: "六π长的一周期，峰高三，谷深负三，零点在零、三π和六π。",
  },
  p220: {
    bounds: [-3.2, 3.2, -19, 18],
    branches: [[-3.2, 3.2, (x) => x ** 4 - 8 * x ** 2]],
    description: "四次函数参考图，两个谷底在横坐标负二与二，原点是局部峰顶",
  },
  p221: {
    bounds: [-6, 6, -1.8, 1.8],
    branches: [[-6, 6, (x) => (3 * x) / (1 + x ** 2)]],
    description: "有理函数参考图，过原点，两端贴近横轴，在负一和一处转弯",
  },
  p222: {
    bounds: [-1, 5, -0.25, 2.3],
    branches: [[-1, 5, (x) => 2 * Math.exp(-((x - 2) ** 2))]],
    description: "钟形曲线参考图，以横坐标二为对称轴，最高点的纵坐标为二",
  },
  p223: {
    bounds: [-3.5, 3.5, -7, 13],
    branches: [
      [-3.5, -0.025, (x) => x ** 2 + 2 / x],
      [0.025, 3.5, (x) => x ** 2 + 2 / x],
    ],
    description: "两支分开的参考曲线，竖直渐近线是纵轴，右支的最低点为一逗号三",
  },
};

export function attachProblemGraphs<T extends { id: string }>(item: T): T {
  const graph = problemGraphsById[item.id];
  const questionGraph = problemQuestionGraphsById[item.id];
  if (!graph && !questionGraph) return item;
  return {
    ...item,
    ...(graph ? { graph } : {}),
    ...(questionGraph ? { questionGraph } : {}),
  };
}
