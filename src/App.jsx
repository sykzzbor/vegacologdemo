import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import ShopFront from "./components/ShopFront.jsx";
import Catalog from "./components/Catalog.jsx";
import Branches from "./components/Branches.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const goToCatalog = useCallback((categoryId) => {
    setActiveCategory(categoryId ?? "todos");
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Bloquear scroll del body con el carrito abierto
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <>
      <Header
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onSelectCategory={goToCatalog}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <ShopFront onSelectCategory={goToCatalog} />
        <Catalog
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          search={search}
          onSearchChange={setSearch}
        />
        <Branches />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
