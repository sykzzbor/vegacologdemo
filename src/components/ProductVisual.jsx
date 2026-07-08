import { PaintRoller, Brush, Layers, InspectionPanel, StickyNote, Package } from "lucide-react";

const TOOL_ICONS = {
  roller: PaintRoller,
  brush: Brush,
  kit: Package,
  tape: StickyNote,
  tray: InspectionPanel,
  sheets: Layers,
};

// Balde de pintura estilizado, con banda del color del producto
function BucketSVG({ color }) {
  return (
    <svg viewBox="0 0 120 110" className="pv-svg" aria-hidden="true">
      {/* sombra */}
      <ellipse cx="60" cy="102" rx="34" ry="5" fill="rgba(20,19,17,0.10)" />
      {/* manija */}
      <path
        d="M 24 38 Q 60 6 96 38"
        fill="none"
        stroke="#9b958a"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="38" r="3" fill="#7c766b" />
      <circle cx="96" cy="38" r="3" fill="#7c766b" />
      {/* cuerpo */}
      <path
        d="M 22 36 L 30 98 Q 30 102 36 102 L 84 102 Q 90 102 90 98 L 98 36 Z"
        fill="#f4f2ee"
        stroke="#d8d3c8"
        strokeWidth="1.5"
      />
      {/* banda de color (etiqueta) */}
      <path d="M 24.6 56 L 95.4 56 L 92.9 76 L 27.1 76 Z" fill={color} />
      {/* marca en etiqueta */}
      <path d="M 24.2 48 L 95.8 48 L 94.8 56 L 25.2 56 Z" fill="#141311" />
      {/* tapa */}
      <ellipse cx="60" cy="36" rx="38" ry="7.5" fill="#e9e6df" stroke="#d8d3c8" strokeWidth="1.5" />
      <ellipse cx="60" cy="34.8" rx="30" ry="5.2" fill={color} opacity="0.9" />
    </svg>
  );
}

// Lata de aerosol / pomo sellador
function SpraySVG({ color }) {
  return (
    <svg viewBox="0 0 120 110" className="pv-svg" aria-hidden="true">
      <ellipse cx="60" cy="103" rx="22" ry="4" fill="rgba(20,19,17,0.10)" />
      {/* tapa */}
      <rect x="47" y="8" width="26" height="14" rx="4" fill="#e9e6df" stroke="#d8d3c8" strokeWidth="1.5" />
      <rect x="55" y="3" width="10" height="7" rx="2" fill="#141311" />
      {/* cuello */}
      <path d="M 44 22 L 76 22 L 80 32 L 40 32 Z" fill="#dcd8cf" />
      {/* cuerpo */}
      <rect x="38" y="32" width="44" height="71" rx="7" fill="#f4f2ee" stroke="#d8d3c8" strokeWidth="1.5" />
      {/* banda superior negra */}
      <rect x="38" y="40" width="44" height="10" fill="#141311" />
      {/* banda de color */}
      <rect x="38" y="50" width="44" height="30" fill={color} />
      {/* brillo */}
      <rect x="44" y="34" width="6" height="66" rx="3" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

export default function ProductVisual({ product }) {
  if (product.visual === "tool") {
    const Icon = TOOL_ICONS[product.icon] ?? Package;
    return (
      <div className="pv pv-tool" style={{ "--chip": product.chip }}>
        <span className="pv-tool-tile">
          <Icon size={38} strokeWidth={1.7} aria-hidden="true" />
        </span>
      </div>
    );
  }
  return (
    <div className="pv">
      {product.visual === "spray" ? (
        <SpraySVG color={product.chip} />
      ) : (
        <BucketSVG color={product.chip} />
      )}
    </div>
  );
}
