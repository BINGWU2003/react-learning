import { type ReactNode, useState } from "react";
import styles from "./DerivedStateDemo.module.css";

type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

type FilterableProductTableProps = {
  products: Product[];
};

type ProductCategoryRowProps = {
  category: string;
};

type ProductRowProps = {
  product: Product;
};

type ProductTableProps = {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
};

type SearchBarProps = {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
};

const FilterableProductTable = ({ products }: FilterableProductTableProps) => {
  // 顶层组件保存筛选条件，并把状态和更新函数传给子组件。
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <section className={styles.card}>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </section>
  );
};

const ProductCategoryRow = ({ category }: ProductCategoryRowProps) => {
  return (
    <tr className={styles.categoryRow}>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

const ProductRow = ({ product }: ProductRowProps) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className={styles.outOfStock}>{product.name}</span>
  );

  return (
    <tr className={styles.productRow}>
      <td>{name}</td>
      <td className={styles.price}>{product.price}</td>
    </tr>
  );
};

const ProductTable = ({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) => {
  const rows: ReactNode[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    // 根据搜索文本和库存开关过滤商品。
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    // 分类变化时插入一行分类标题。
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) => {
  return (
    <form className={styles.searchBar}>
      <label className={styles.searchField}>
        <span>Search products</span>
        <input
          type="text"
          value={filterText}
          placeholder="Apple, Peas..."
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </label>
      <label className={styles.stockToggle}>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        <span>Only show products in stock</span>
      </label>
    </form>
  );
};

const PRODUCTS: Product[] = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export function DerivedStateDemo() {
  return <FilterableProductTable products={PRODUCTS} />;
}
