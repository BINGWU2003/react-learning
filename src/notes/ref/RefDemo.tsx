import { ComponentPropsWithoutRef, forwardRef, useRef, useState } from "react";

type SearchInputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ label, ...inputProps }, ref) {
    return (
      <label>
        {label}：
        <input ref={ref} {...inputProps} />
      </label>
    );
  },
);

export function RefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [action, setAction] = useState("等待父组件操作");

  const focusInput = () => {
    inputRef.current?.focus();
    setAction("父组件已让输入框获得焦点");
    console.log(inputRef.current);
  };

  const selectInput = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
    setAction("父组件已选中输入框中的全部内容");
  };

  return (
    <div className="demo-grid">
      <section className="demo-copy dynamic-copy">
        <p className="eyebrow">forwardRef Child</p>
        <h2>子组件输入框</h2>
        <p>
          <code>SearchInput</code> 使用 <code>forwardRef</code>
          将内部原生输入框的引用转发给父组件。
        </p>
        <SearchInput
          ref={inputRef}
          label="搜索内容"
          defaultValue="React forwardRef"
        />
      </section>

      <section className="demo-copy dynamic-copy">
        <p className="eyebrow">useRef Parent</p>
        <h2>父组件控制子组件</h2>
        <p>
          父组件通过转发后的 ref 直接调用输入框的 <code>focus()</code> 和
          <code>select()</code> 方法。
        </p>
        <button type="button" onClick={focusInput}>
          聚焦输入框
        </button>
        <button type="button" onClick={selectInput}>
          全选输入内容
        </button>
        <p aria-live="polite">当前状态：{action}</p>
      </section>
    </div>
  );
}
