import { useMemo } from "react";
import { SearchX } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

// Normaliza texto para buscar sin acentos ni mayúsculas
const normalize = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Catalog({ activeCategory, onCategoryChange, search, onSearchChange }) {
  const filtered = useMemo(() => {
    const q = normalize(search.trim());
    return PRODUCTS.filter((p) => {
      const matchCategory = activeCategory === "todos" || p.category === activeCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      const haystack = normalize(`${p.name} ${p.brand} ${p.desc} ${p.code}`);
      return haystack.includes(q);
    });
  }, [activeCategory, search]);

  const categoryLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label;

  return (
    <section className="catalog" id="catalogo">
      <div className="container">
        <div className="catalog-head">
          <div>
            <h2>{activeCategory === "todos" ? "Catálogo completo" : categoryLabel}</h2>
            <p className="catalog-count" aria-live="polite">
              {filtered.length} producto{filtered.length === 1 ? "" : "s"}
              {search.trim() && ` para "${search.trim()}"`}
              {" · precios de lista, confirmamos stock por WhatsApp"}
            </p>
          </div>
          <div className="filter-pills" role="tablist" aria-label="Filtrar por categoría">
            <button
              role="tab"
              aria-selected={activeCategory === "todos"}
              className={`pill ${activeCategory === "todos" ? "pill-active" : ""}`}
              onClick={() => onCategoryChange("todos")}
            >
              Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`pill ${activeCategory === cat.id ? "pill-active" : ""}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={36} strokeWidth={1.6} aria-hidden="true" />
            <h3>No encontramos "{search}"</h3>
            <p>
              Probá con otra palabra o{" "}
              <button
                className="link-button"
                onClick={() => {
                  onSearchChange("");
                  onCategoryChange("todos");
                }}
              >
                ver el catálogo completo
              </button>
              . Manejamos mucho más stock del que ves acá: consultanos por WhatsApp.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
