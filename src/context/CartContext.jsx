import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { PRODUCTS } from "../data/products.js";

const CartContext = createContext(null);

const STORAGE_KEY = "vegacolor-cart-v1";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Descartar ids que ya no existen en el catálogo
    const valid = {};
    for (const [id, qty] of Object.entries(parsed)) {
      if (PRODUCTS.some((p) => p.id === id) && Number.isInteger(qty) && qty > 0) {
        valid[id] = Math.min(qty, 99);
      }
    }
    return valid;
  } catch {
    return {};
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const qty = (state[action.id] || 0) + (action.qty ?? 1);
      return { ...state, [action.id]: Math.min(qty, 99) };
    }
    case "decrement": {
      const qty = (state[action.id] || 0) - 1;
      if (qty <= 0) {
        const { [action.id]: _, ...rest } = state;
        return rest;
      }
      return { ...state, [action.id]: qty };
    }
    case "remove": {
      const { [action.id]: _, ...rest } = state;
      return rest;
    }
    case "clear":
      return {};
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // almacenamiento no disponible: el carrito sigue funcionando en memoria
    }
  }, [items]);

  const value = useMemo(() => {
    const entries = Object.entries(items).map(([id, qty]) => ({
      product: PRODUCTS.find((p) => p.id === id),
      qty,
    }));
    const count = entries.reduce((acc, e) => acc + e.qty, 0);
    const total = entries.reduce(
      (acc, e) => acc + (e.product.price ? e.product.price * e.qty : 0),
      0
    );
    const hasConsultItems = entries.some((e) => e.product.price === null);
    return {
      entries,
      count,
      total,
      hasConsultItems,
      add: (id, qty) => dispatch({ type: "add", id, qty }),
      decrement: (id) => dispatch({ type: "decrement", id }),
      remove: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
