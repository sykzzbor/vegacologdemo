import { ArrowRight, MapPin, Store, Truck, MessageSquareText, CreditCard } from "lucide-react";
import { CATEGORIES, FEATURED } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

const TRUST = [
  { icon: Store, title: "3 sucursales", text: "Jesús María, Caroya y Tirolesa" },
  { icon: Truck, title: "Retiro en el día", text: "Tu pedido listo en mostrador" },
  { icon: CreditCard, title: "Todos los medios de pago", text: "Efectivo, transferencia y tarjetas" },
  { icon: MessageSquareText, title: "Asesoramiento real", text: "Te atendemos por WhatsApp" },
];

export default function ShopFront({ onSelectCategory }) {
  return (
    <section className="shopfront" id="inicio">
      <div className="container">
        <div className="shopfront-grid">
          {/* Panel comercial */}
          <aside className="shop-panel">
            <span className="shop-panel-eyebrow">Tienda online oficial</span>
            <h1>
              Pedí online y retirá <em>hoy</em> en tu sucursal
            </h1>
            <p>
              Precios de lista, stock real y atención de mostrador. Armá el
              pedido y coordinalo por WhatsApp en un minuto.
            </p>
            <div className="shop-panel-actions">
              <a className="btn btn-accent" href="#catalogo">
                Ver catálogo
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="btn btn-ghost" href="#sucursales">
                <MapPin size={16} aria-hidden="true" />
                Buscar sucursal
              </a>
            </div>
            <div className="shop-panel-cats">
              <span>Categorías</span>
              <ul>
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button onClick={() => onSelectCategory(cat.id)}>{cat.label}</button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Destacados */}
          <div className="shop-featured">
            <div className="shop-featured-head">
              <h2>Ofertas y destacados</h2>
              <a href="#catalogo" className="shop-featured-more">
                Ver todo
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="featured-grid">
              {FEATURED.slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </div>

        {/* Franja de confianza compacta */}
        <ul className="trust-strip">
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.title}>
                <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                <div>
                  <strong>{t.title}</strong>
                  <small>{t.text}</small>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
