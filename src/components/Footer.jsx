import { Instagram, MapPin } from "lucide-react";
import { BRANCHES, INSTAGRAM_URL, WHATSAPP_NUMBER } from "../config.js";
import { WhatsAppIcon } from "./icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="swatch-stripe" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#inicio">
            <img className="footer-logo" src="/logo/vegacolor.png" alt="Vegacolor Pinturerías" />
          </a>
          <p>
            Pinturas, herramientas y accesorios para obra y hogar. Atendemos en
            el norte de Córdoba con asesoramiento de mostrador, como siempre.
          </p>
          <div className="footer-social">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Vegacolor Pinturerías"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Vegacolor Pinturerías"
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Enlaces del sitio">
          <h4>Tienda</h4>
          <a href="#catalogo">Catálogo</a>
          <a href="#categorias">Categorías</a>
          <a href="#beneficios">Por qué elegirnos</a>
          <a href="#sucursales">Sucursales</a>
        </nav>

        <div className="footer-col" aria-label="Sucursales">
          <h4>Sucursales</h4>
          {BRANCHES.map((b) => (
            <p key={b.id}>
              <MapPin size={13} aria-hidden="true" />
              <span>
                <strong>{b.name}</strong> — {b.address}
              </span>
            </p>
          ))}
        </div>

        <div className="footer-col">
          <h4>Horarios</h4>
          <p>Lunes a viernes desde las 8:00</p>
          <p>Sábados de 8:00 a 12:30</p>
          <p className="footer-hours-note">
            Cada sucursal tiene su horario de tarde — mirá el detalle en la
            sección de sucursales.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} Vegacolor Pinturerías. Todos los derechos reservados.</span>
          <span>
            Desarrollado por{" "}
            <a href="#" className="footer-credit" onClick={(e) => e.preventDefault()}>
              Vantix
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
