import { memo } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "机械键盘", price: 499 },
  { id: 2, name: "无线鼠标", price: 299 },
  { id: 3, name: "显示器支架", price: 359 },
];

type Props = {
  selectedId: number | null;
  onSelect: (product: Product) => void;
};

export const ProductList = memo(function ProductList({
  selectedId,
  onSelect,
}: Props) {
  return (
    <ul className="demo-list">
      {products.map((product) => (
        <li key={product.id}>
          <span>
            {product.name} · ¥{product.price}
          </span>
          <button
            className="demo-button"
            type="button"
            aria-pressed={selectedId === product.id}
            onClick={() => onSelect(product)}
          >
            {selectedId === product.id ? "已选择" : "选择"}
          </button>
        </li>
      ))}
    </ul>
  );
});
