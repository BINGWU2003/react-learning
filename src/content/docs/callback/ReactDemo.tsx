import { useCallback, useState } from "react";
import { ProductList, type Product } from "./ProductList";

export function ReactDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <div className="demo-stack">
      <ProductList
        selectedId={selectedProduct?.id ?? null}
        onSelect={handleSelect}
      />

      <div className="demo-card">
        <span className="demo-tag">当前选择</span>
        <h2>{selectedProduct?.name ?? "尚未选择商品"}</h2>
        <p>
          {selectedProduct
            ? `价格 ¥${selectedProduct.price}`
            : "点击列表中的按钮选择商品。"}
        </p>
      </div>

      <div className="demo-actions">
        <button
          className="demo-button"
          type="button"
          onClick={() => setCartCount((count) => count + 1)}
        >
          购物车 +1（当前 {cartCount}）
        </button>
      </div>
      <p className="demo-muted">
        更新购物车会重新渲染父组件，但稳定的 onSelect 不会破坏 memo 缓存。
      </p>
    </div>
  );
}
