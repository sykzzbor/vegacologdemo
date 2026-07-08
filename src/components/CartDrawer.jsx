import { useEffect, useState } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Truck,
  Banknote,
  Landmark,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import {
  BRANCHES,
  BUSINESS_NAME,
  WHATSAPP_NUMBER,
  formatPrice,
} from "../config.js";
import { WhatsAppIcon } from "./icons.jsx";

const PAYMENT_METHODS = [
  {
    id: "efectivo",
    label: "Efectivo al retirar",
    note: "Pagás en la sucursal cuando buscás el pedido",
    icon: Banknote,
  },
  {
    id: "transferencia",
    label: "Transferencia bancaria",
    note: "Te pasamos el CBU/alias al confirmar",
    icon: Landmark,
  },
  {
    id: "mercadopago",
    label: "Mercado Pago",
    note: "Link de pago al confirmar el pedido",
    icon: Wallet,
  },
  {
    id: "tarjeta",
    label: "Tarjeta débito / crédito",
    note: "Se abona en sucursal (demo: sin datos de tarjeta)",
    icon: CreditCard,
  },
];

const STEPS = ["Tus datos", "Entrega", "Pago", "Resumen"];

function buildWhatsAppMessage({ entries, total, hasConsultItems, form }) {
  const branch = BRANCHES.find((b) => b.id === form.branchId) ?? BRANCHES[0];
  const payment = PAYMENT_METHODS.find((p) => p.id === form.paymentId);
  const lines = [];
  lines.push("Hola Vegacolor, quiero consultar por este pedido:");
  lines.push("");
  lines.push(`*Pedido — ${BUSINESS_NAME}*`);
  lines.push("------------------------------");
  for (const { product, qty } of entries) {
    const price =
      product.price !== null ? formatPrice(product.price * qty) : "a consultar";
    lines.push(`• ${qty} × ${product.name} (${product.brand}, ${product.size}) — ${price}`);
  }
  lines.push("------------------------------");
  if (total > 0) {
    lines.push(
      `*Total estimado:* ${formatPrice(total)}${hasConsultItems ? " (+ productos a cotizar)" : ""}`
    );
  } else {
    lines.push("*Total:* a confirmar");
  }
  lines.push("");
  lines.push(`*Nombre:* ${form.name.trim()}`);
  lines.push(`*Teléfono:* ${form.phone.trim()}`);
  if (form.delivery === "retiro") {
    lines.push(`*Entrega:* Retiro en sucursal ${branch.name} — ${branch.address}`);
  } else {
    lines.push(`*Entrega:* Envío a domicilio — ${form.address.trim()}`);
    lines.push(`*Sucursal que prepara:* ${branch.name}`);
  }
  lines.push(`*Forma de pago:* ${payment?.label ?? "A definir"}`);
  if (form.notes.trim()) lines.push(`*Observaciones:* ${form.notes.trim()}`);
  lines.push("");
  lines.push("¿Me confirman stock y total final? ¡Gracias!");
  return lines.join("\n");
}

const INITIAL_FORM = {
  name: "",
  phone: "",
  delivery: "retiro", // "retiro" | "envio"
  branchId: BRANCHES[0].id,
  address: "",
  paymentId: "efectivo",
  notes: "",
};

export default function CartDrawer({ open, onClose }) {
  const { entries, count, total, hasConsultItems, add, decrement, remove, clear } = useCart();
  const [view, setView] = useState("cart"); // "cart" | "checkout"
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);

  // Al reabrir, siempre arrancar en la vista de carrito
  useEffect(() => {
    if (open) {
      setView("cart");
      setStep(0);
    }
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const branch = BRANCHES.find((b) => b.id === form.branchId) ?? BRANCHES[0];
  const payment = PAYMENT_METHODS.find((p) => p.id === form.paymentId);

  const stepValid =
    step === 0
      ? form.name.trim().length >= 2 && form.phone.trim().length >= 6
      : step === 1
        ? form.delivery === "retiro" || form.address.trim().length >= 5
        : true;

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage({ entries, total, hasConsultItems, form })
  )}`;

  const goBack = () => {
    if (step === 0) setView("cart");
    else setStep((s) => s - 1);
  };

  return (
    <div className={`drawer-root ${open ? "drawer-open" : ""}`} aria-hidden={!open}>
      <div className="drawer-overlay" onClick={onClose} />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={view === "cart" ? "Carrito de compras" : "Finalizar pedido"}
      >
        <header className="drawer-head">
          {view === "checkout" ? (
            <button className="icon-button" onClick={goBack} aria-label="Volver">
              <ArrowLeft size={20} />
            </button>
          ) : (
            <span className="drawer-title-icon">
              <ShoppingCart size={18} aria-hidden="true" />
            </span>
          )}
          <h2>
            {view === "cart"
              ? `Mi carrito ${count > 0 ? `(${count})` : ""}`
              : "Finalizar pedido"}
          </h2>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar carrito">
            <X size={20} />
          </button>
        </header>

        {view === "checkout" && (
          <ol className="steps" aria-label="Pasos del pedido">
            {STEPS.map((label, i) => (
              <li
                key={label}
                className={i === step ? "step-current" : i < step ? "step-done" : ""}
                aria-current={i === step ? "step" : undefined}
              >
                <i>{i + 1}</i>
                <span>{label}</span>
              </li>
            ))}
          </ol>
        )}

        {view === "cart" ? (
          entries.length === 0 ? (
            <div className="drawer-empty">
              <span className="drawer-empty-swatches" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
              <h3>Tu carrito está vacío</h3>
              <p>
                Sumá productos desde el catálogo y armá tu pedido. Lo terminás
                por WhatsApp con una persona real del otro lado.
              </p>
              <button className="btn btn-primary" onClick={onClose}>
                Ver productos
              </button>
            </div>
          ) : (
            <>
              <ul className="cart-list">
                {entries.map(({ product, qty }) => (
                  <li className="cart-item" key={product.id}>
                    <span
                      className="cart-item-chip"
                      style={{ "--chip": product.chip }}
                      aria-hidden="true"
                    />
                    <div className="cart-item-info">
                      <strong>{product.name}</strong>
                      <span className="cart-item-detail">
                        {product.brand} · {product.size}
                      </span>
                      <span className="cart-item-price">
                        {product.price !== null
                          ? `${formatPrice(product.price)} c/u`
                          : "Precio a consultar"}
                      </span>
                      <div className="cart-item-controls">
                        <div className="qty-stepper">
                          <button
                            onClick={() => decrement(product.id)}
                            aria-label={`Quitar una unidad de ${product.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span aria-live="polite">{qty}</span>
                          <button
                            onClick={() => add(product.id)}
                            aria-label={`Sumar una unidad de ${product.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          className="cart-item-remove"
                          onClick={() => remove(product.id)}
                          aria-label={`Eliminar ${product.name} del carrito`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <span className="cart-item-subtotal">
                      {product.price !== null ? formatPrice(product.price * qty) : "—"}
                    </span>
                  </li>
                ))}
              </ul>

              <footer className="drawer-foot">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="cart-total">
                  <span>Total estimado</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                {hasConsultItems && (
                  <p className="cart-note">
                    Incluye productos a cotizar: te confirmamos el total final
                    por WhatsApp.
                  </p>
                )}
                <button
                  className="btn btn-accent btn-block btn-lg"
                  onClick={() => {
                    setView("checkout");
                    setStep(0);
                  }}
                >
                  Finalizar pedido
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <button className="link-button cart-clear" onClick={clear}>
                  Vaciar carrito
                </button>
              </footer>
            </>
          )
        ) : (
          <form className="checkout" onSubmit={(e) => e.preventDefault()}>
            {step === 0 && (
              <div className="checkout-fields">
                <label className="field">
                  <span>Nombre y apellido *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Ej.: Marcos Pérez"
                    autoComplete="name"
                  />
                </label>
                <label className="field">
                  <span>Teléfono *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="Ej.: 3525 123456"
                    autoComplete="tel"
                  />
                </label>
                <p className="field-hint">
                  Usamos tus datos solo para preparar el pedido. Nada de spam.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="checkout-fields">
                <fieldset className="field">
                  <legend>Método de entrega</legend>
                  <div className="option-row">
                    <label className={`option-card ${form.delivery === "retiro" ? "option-active" : ""}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value="retiro"
                        checked={form.delivery === "retiro"}
                        onChange={set("delivery")}
                      />
                      <MapPin size={17} aria-hidden="true" />
                      <span>
                        <strong>Retiro en sucursal</strong>
                        <small>Sin costo — listo en el día</small>
                      </span>
                    </label>
                    <label className={`option-card ${form.delivery === "envio" ? "option-active" : ""}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value="envio"
                        checked={form.delivery === "envio"}
                        onChange={set("delivery")}
                      />
                      <Truck size={17} aria-hidden="true" />
                      <span>
                        <strong>Envío a domicilio</strong>
                        <small>Coordinamos costo y horario</small>
                      </span>
                    </label>
                  </div>
                </fieldset>

                {form.delivery === "envio" && (
                  <label className="field">
                    <span>Dirección de entrega *</span>
                    <input
                      type="text"
                      value={form.address}
                      onChange={set("address")}
                      placeholder="Calle, número y localidad"
                      autoComplete="street-address"
                    />
                  </label>
                )}

                <fieldset className="field">
                  <legend>
                    {form.delivery === "retiro" ? "¿Dónde retirás?" : "¿Qué sucursal prepara el pedido?"}
                  </legend>
                  <div className="branch-options">
                    {BRANCHES.map((b) => (
                      <label
                        key={b.id}
                        className={`option-card ${form.branchId === b.id ? "option-active" : ""}`}
                      >
                        <input
                          type="radio"
                          name="branch"
                          value={b.id}
                          checked={form.branchId === b.id}
                          onChange={set("branchId")}
                        />
                        <MapPin size={17} aria-hidden="true" />
                        <span>
                          <strong>{b.name}</strong>
                          <small>{b.address}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-fields">
                <fieldset className="field">
                  <legend>¿Cómo querés pagar?</legend>
                  <div className="branch-options">
                    {PAYMENT_METHODS.map((m) => {
                      const Icon = m.icon;
                      return (
                        <label
                          key={m.id}
                          className={`option-card ${form.paymentId === m.id ? "option-active" : ""}`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={m.id}
                            checked={form.paymentId === m.id}
                            onChange={set("paymentId")}
                          />
                          <Icon size={17} aria-hidden="true" />
                          <span>
                            <strong>{m.label}</strong>
                            <small>{m.note}</small>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <p className="field-hint">
                  No te pedimos datos de tarjeta ni cobramos online: el pago se
                  coordina al confirmar el pedido.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-fields">
                <div className="summary-box">
                  <h3>Tu pedido</h3>
                  <ul className="summary-items">
                    {entries.map(({ product, qty }) => (
                      <li key={product.id}>
                        <span>
                          {qty} × {product.name} <small>({product.size})</small>
                        </span>
                        <strong>
                          {product.price !== null ? formatPrice(product.price * qty) : "a cotizar"}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <div className="cart-total">
                    <span>Total estimado</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                </div>

                <div className="summary-box">
                  <h3>Datos del pedido</h3>
                  <dl className="summary-data">
                    <div><dt>Nombre</dt><dd>{form.name.trim() || "—"}</dd></div>
                    <div><dt>Teléfono</dt><dd>{form.phone.trim() || "—"}</dd></div>
                    <div>
                      <dt>Entrega</dt>
                      <dd>
                        {form.delivery === "retiro"
                          ? `Retiro en ${branch.name}`
                          : `Envío a ${form.address.trim()}`}
                      </dd>
                    </div>
                    <div><dt>Pago</dt><dd>{payment?.label}</dd></div>
                  </dl>
                </div>

                <label className="field">
                  <span>Observaciones (opcional)</span>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={set("notes")}
                    placeholder="Colores, marcas preferidas, para cuándo lo necesitás…"
                  />
                </label>
              </div>
            )}

            <div className="checkout-nav">
              {step < 3 ? (
                <button
                  type="button"
                  className="btn btn-accent btn-block btn-lg"
                  disabled={!stepValid}
                  onClick={() => setStep((s) => s + 1)}
                >
                  Continuar
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              ) : (
                <>
                  <a
                    className="btn btn-wa btn-block btn-lg"
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={19} />
                    Enviar pedido por WhatsApp
                  </a>
                  <p className="checkout-disclaimer">
                    Se abre WhatsApp con el pedido ya armado. Confirmás stock,
                    total y pago directamente con la sucursal.
                  </p>
                </>
              )}
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
