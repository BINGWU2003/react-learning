import { useMemo, useState } from "react";

type SortOrder = "asc" | "desc";

const categories = ["机械键盘", "无线鼠标", "显示器", "前端书籍"];

const products = Array.from({ length: 5_000 }, (_, index) => ({
  id: index + 1,
  name: `${categories[index % categories.length]} ${String(index + 1).padStart(4, "0")}`,
  price: 99 + ((index * 37) % 900),
}));

const priceFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

export function ReactDemo() {
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [cartCount, setCartCount] = useState(0);

  const result = useMemo(() => {
    const visibleProducts = products
      .filter((product) => product.name.includes(keyword.trim()))
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price,
      );

    return {
      count: visibleProducts.length,
      total: visibleProducts.reduce((sum, product) => sum + product.price, 0),
      preview: visibleProducts.slice(0, 5),
    };
  }, [keyword, sortOrder]);

  return (
    <div className="demo-stack">
      <div className="demo-form">
        <label className="demo-field">
          搜索 5,000 条商品
          <input
            className="demo-input"
            value={keyword}
            placeholder="例如 机械键盘"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </label>
        <label className="demo-field">
          价格排序
          <select
            className="demo-select"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as SortOrder)}
          >
            <option value="asc">从低到高</option>
            <option value="desc">从高到低</option>
          </select>
        </label>
      </div>

      <div className="demo-card">
        <span className="demo-tag">缓存的计算结果</span>
        <h2>{result.count.toLocaleString()} 件商品</h2>
        <p>合计 {priceFormatter.format(result.total)}</p>
      </div>

      <ul className="demo-list">
        {result.preview.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{priceFormatter.format(product.price)}</span>
          </li>
        ))}
      </ul>

      <div className="demo-actions">
        <button
          className="demo-button"
          type="button"
          onClick={() => setCartCount((count) => count + 1)}
        >
          购物车 +1（当前 {cartCount}）
        </button>
      </div>
      <p className="demo-muted">购物车不是依赖，更新它会复用上一次计算结果。</p>
    </div>
  );
}
