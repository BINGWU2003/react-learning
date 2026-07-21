import { useState } from "react";

const products = [
  { id: 1, name: "Apple", price: "$1", stocked: true },
  { id: 2, name: "Dragonfruit", price: "$1", stocked: true },
  { id: 3, name: "Passionfruit", price: "$2", stocked: false },
  { id: 4, name: "Spinach", price: "$2", stocked: true },
];

export function ReactDemo() {
  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const visibleProducts = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesQuery && (!inStockOnly || product.stocked);
  });

  return (
    <div className="demo-stack">
      <label className="demo-field">
        搜索商品
        <input
          className="demo-input"
          value={query}
          placeholder="例如 Apple"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <label className="demo-field">
        <span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
          />{" "}
          仅显示有库存
        </span>
      </label>
      <ul className="demo-list">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span className={product.stocked ? "" : "demo-muted"}>
              {product.price} · {product.stocked ? "有库存" : "缺货"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
