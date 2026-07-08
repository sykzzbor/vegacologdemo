import { useEffect, useRef, useState } from "react";
import { Plus, Check, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { discountPercent } from "../data/products.js";
import { formatPrice } from "../config.js";
import ProductVisual from "./ProductVisual.jsx";

const BADGES = {
  oferta: { label: "Oferta", className: "badge-oferta" },
  nuevo: { label: "Nuevo", className: "badge-nuevo" },
  top: { label: "Más vendido", className: "badge-top" },
};

export default function ProductCard({ product, compact = false }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleAdd = () => {
    add(product.id);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  };

  const badge = product.badge ? BADGES[product.badge] : null;
  const off = discountPercent(product);

  return (
    <article className={`product-card ${compact ? "product-card-compact" : ""}`}>
      <div className="product-media">
        <ProductVisual product={product} />
        <div className="product-badges">
          {badge && <span className={`badge ${badge.className}`}>{badge.label}</span>}
          {off && <span className="badge badge-off">-{off}%</span>}
        </div>
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          <span className="product-size">{product.size}</span>
        </div>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-pricing">
          {product.price !== null ? (
            <>
              {product.oldPrice && (
                <span className="product-oldprice">{formatPrice(product.oldPrice)}</span>
              )}
              <span className="product-price">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="product-price-consult">
              <MessageCircle size={14} aria-hidden="true" />
              Precio a consultar
            </span>
          )}
        </div>

        <span className={`product-stock ${product.stock === "low" ? "stock-low" : "stock-in"}`}>
          <i aria-hidden="true" />
          {product.stock === "low" ? "Últimas unidades" : "En stock"}
        </span>

        <button
          className={`btn btn-add ${added ? "btn-added" : ""}`}
          onClick={handleAdd}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          {added ? (
            <>
              <Check size={16} aria-hidden="true" /> Agregado
            </>
          ) : (
            <>
              <Plus size={16} aria-hidden="true" /> Agregar al carrito
            </>
          )}
        </button>
      </div>
    </article>
  );
}
