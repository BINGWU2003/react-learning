import { forwardRef, useImperativeHandle, useRef, useState } from "react";

type SearchInputHandle = {
  focus: () => void;
  select: () => void;
};

const SearchInput = forwardRef<SearchInputHandle>(function SearchInput(_, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    select: () => inputRef.current?.select(),
  }), []);

  return (
    <label className="demo-field">
      子组件输入框
      <input
        ref={inputRef}
        className="demo-input"
        defaultValue="React forwardRef"
      />
    </label>
  );
});

export function ReactDemo() {
  const searchRef = useRef<SearchInputHandle>(null);
  const [action, setAction] = useState("等待操作");

  return (
    <div className="demo-stack">
      <SearchInput ref={searchRef} />
      <div className="demo-actions">
        <button
          className="demo-button"
          type="button"
          onClick={() => {
            searchRef.current?.focus();
            setAction("已聚焦输入框");
          }}
        >
          聚焦
        </button>
        <button
          className="demo-button"
          type="button"
          onClick={() => {
            searchRef.current?.select();
            setAction("已全选输入内容");
          }}
        >
          全选
        </button>
      </div>
      <p className="demo-result" aria-live="polite">{action}</p>
    </div>
  );
}
