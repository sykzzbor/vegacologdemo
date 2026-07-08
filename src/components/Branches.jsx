import { useState } from "react";
import { MapPin, Clock, ExternalLink, Store } from "lucide-react";
import { BRANCHES, mapsUrl, WHATSAPP_NUMBER } from "../config.js";
import { WhatsAppIcon } from "./icons.jsx";

const ACCENTS = ["#E23B2E", "#F58220", "#3E9B4F"];

// Extensiones que se prueban en orden con el mismo nombre base.
// Así, sea cual sea el formato que guardes (jpg/png/webp), funciona igual.
const IMG_EXTS = [".jpg", ".jpeg", ".png", ".webp"];

function BranchPhoto({ src, name }) {
  const [extIndex, setExtIndex] = useState(0);
  const exhausted = extIndex >= IMG_EXTS.length;

  if (!src || exhausted) {
    return (
      <div className="branch-photo branch-photo-fallback" aria-hidden="true">
        <span className="branch-photo-chevron">
          <i /><i /><i /><i />
        </span>
        <Store size={26} strokeWidth={1.8} />
      </div>
    );
  }

  return (
    <div className="branch-photo">
      <img
        src={`${src}${IMG_EXTS[extIndex]}`}
        alt={`Sucursal Vegacolor ${name}`}
        loading="lazy"
        onError={() => setExtIndex((i) => i + 1)}
      />
    </div>
  );
}

export default function Branches() {
  return (
    <section className="branches" id="sucursales">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="section-kicker">Sucursales</p>
          <h2>Pasá por la que te quede más cerca</h2>
          <p className="section-sub">
            Tres locales con el mismo stock, los mismos precios y la misma
            atención. Elegí dónde retirar cuando armes tu pedido.
          </p>
        </div>
        <div className="branch-grid">
          {BRANCHES.map((b, i) => (
            <article className="branch-card" style={{ "--accent": ACCENTS[i % ACCENTS.length] }} key={b.id}>
              <BranchPhoto src={b.image} name={b.name} />
              <div className="branch-body">
                <header className="branch-head">
                  <h3>{b.name}</h3>
                  <p>
                    <MapPin size={15} aria-hidden="true" />
                    {b.address} · {b.city}
                  </p>
                </header>
                <ul className="branch-hours">
                  {b.hours.map((h) => (
                    <li key={h.days}>
                      <Clock size={14} aria-hidden="true" />
                      <span>
                        <strong>{h.days}:</strong> {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="branch-actions">
                  <a
                    className="btn btn-outline btn-sm"
                    href={mapsUrl(b)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                  <a
                    className="btn btn-wa btn-sm"
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hola Vegacolor, quiero hacer una consulta a la sucursal de ${b.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={15} />
                    Consultar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
