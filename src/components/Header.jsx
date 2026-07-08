import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Search, MapPin } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { CATEGORIES } from "../data/products.js";
import { WHATSAPP_NUMBER } from "../config.js";
import { WhatsAppIcon } from "./icons.jsx";

export default function Header({ search, onSearchChange, activeCategory, onSelectCategory, onOpenCart }) {
  const { count, total } = useCart();
  const [bump, setBump] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola Vegacolor, quiero hacerles una consulta."
  )}`;

  const handleSearch = (value) => {
    onSearchChange(value);
    // Al tipear, llevar al usuario al catálogo para ver resultados
    if (value.length === 1) {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="header">
      <div className="swatch-stripe" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="header-main container">
        <a className="brand" href="#inicio" aria-label="Vegacolor Pinturerías — inicio">
          <img className="brand-logo" src="/logo/vegacolor.png" alt="Vegacolor Pinturerías" />
        </a>

        <label className="header-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="¿Qué estás buscando? Látex, esmalte, rodillos…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </label>

        <div className="header-actions">
          <a
            className="header-wa"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
          >
            <WhatsAppIcon size={19} />
            <span className="header-wa-text">
              <small>Consultas</small>
              <strong>WhatsApp</strong>
            </span>
          </a>

          <button
            className="cart-button"
            onClick={onOpenCart}
            aria-label={`Abrir carrito, ${count} producto${count === 1 ? "" : "s"}`}
          >
            <span className="cart-button-icon">
              <ShoppingCart size={20} strokeWidth={2.2} />
              {count > 0 && (
                <span className={`cart-badge ${bump ? "cart-badge-bump" : ""}`}>{count}</span>
              )}
            </span>
            <span className="cart-button-text">
              <small>Mi carrito</small>
              <strong>{count > 0 ? `${count} ítem${count === 1 ? "" : "s"}` : "Vacío"}</strong>
            </span>
          </button>
        </div>
      </div>

      {/* Buscador en su propia fila en mobile */}
      <div className="header-search-mobile container">
        <label className="header-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar látex, esmalte, rodillos…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </label>
      </div>

      <nav className="header-nav" aria-label="Categorías">
        <div className="container header-nav-inner">
          <button
            className={`nav-cat ${activeCategory === "todos" ? "nav-cat-active" : ""}`}
            onClick={() => onSelectCategory("todos")}
          >
            Todos los productos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`nav-cat ${activeCategory === cat.id ? "nav-cat-active" : ""}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
          <a className="nav-cat nav-cat-link" href="#sucursales">
            <MapPin size={14} aria-hidden="true" />
            Sucursales
          </a>
        </div>
      </nav>
    </header>
  );
}
