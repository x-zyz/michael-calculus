export default function MathArtwork({ compact = false }: { compact?: boolean }) {
  return <svg className={compact ? 'math-art compact' : 'math-art'} viewBox="0 0 470 300" role="img" aria-label="抛物线上的割线与切线示意图，展示导数的几何意义">
    <defs>
      <pattern id={compact ? 'grid-small' : 'grid'} width="31" height="31" patternUnits="userSpaceOnUse"><path d="M 31 0 L 0 0 0 31" fill="none" stroke="currentColor" strokeOpacity=".085" strokeWidth="1" /></pattern>
      <linearGradient id={compact ? 'area-small' : 'area'} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9fbdff" stopOpacity=".2"/><stop offset="100%" stopColor="#9fbdff" stopOpacity="0"/></linearGradient>
    </defs>
    <rect width="470" height="300" fill={`url(#${compact ? 'grid-small' : 'grid'})`} />
    <path d="M55 66 Q200 390 397 35 L397 253 L55 253 Z" fill={`url(#${compact ? 'area-small' : 'area'})`} />
    <path d="M28 253 H449 M116 283 V23" fill="none" stroke="currentColor" strokeOpacity=".35" />
    <path d="m443 249 6 4-6 4 m-331-228 4-6 4 6" fill="none" stroke="currentColor" strokeOpacity=".55" />
    <path d="M55 66 Q200 390 397 35" fill="none" stroke="#a3bfff" strokeWidth="3" />
    <path d="M159 290 379 80" fill="none" stroke="#d6ee97" strokeWidth="2" />
    <path d="M150 280 393 161" fill="none" stroke="#fff" strokeOpacity=".33" strokeWidth="1.5" strokeDasharray="6 6" />
    <path d="M237 217 V253 M326 132 V253 M237 217 H326 V132" fill="none" stroke="#e0e5f2" strokeOpacity=".32" strokeDasharray="4 5" />
    <circle cx="237" cy="217" r="6" fill="#d6ee97" stroke="#21334e" strokeWidth="3" />
    <circle cx="326" cy="132" r="6" fill="#a3bfff" stroke="#21334e" strokeWidth="3" />
    <g fill="currentColor" fontFamily="Georgia, serif" fontStyle="italic" fontSize="14"><text x="450" y="273">x</text><text x="96" y="29">y</text><text x="98" y="272">0</text><text x="230" y="275">x</text><text x="311" y="275">x + h</text><text x="339" y="130">P₂</text><text x="215" y="207">P₁</text><text x="337" y="49" fill="#a3bfff">f(x)</text><text x="267" y="240">h → 0</text></g>
    <g transform="translate(145 22)"><rect width="133" height="37" rx="8" fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".12"/><text x="15" y="24" fill="#e9edf4" fontFamily="Georgia, serif" fontSize="16" fontStyle="italic">f ′(x) = lim Δy/Δx</text></g>
  </svg>;
}
