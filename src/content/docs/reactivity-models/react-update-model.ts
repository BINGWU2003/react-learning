type SetStateAction<T> = T | ((previous: T) => T);

// 当前组件实例拥有的 Hook 槽位（教学模型）
const componentHooks: unknown[] = [];
let currentHookIndex = 0;
let renderScheduled = false;

function useState<T>(initialState: T) {
  const hookIndex = currentHookIndex;

  if (componentHooks[hookIndex] === undefined) {
    componentHooks[hookIndex] = initialState;
  }

  const state = componentHooks[hookIndex] as T;
  function setState(action: SetStateAction<T>) {
    const previous = componentHooks[hookIndex] as T;
    componentHooks[hookIndex] =
      typeof action === "function"
        ? (action as (value: T) => T)(previous)
        : action;
    scheduleRender();
  }

  currentHookIndex += 1;
  return [state, setState] as const;
}

function scheduleRender() {
  if (renderScheduled) return;
  renderScheduled = true;
  queueMicrotask(() => {
    renderScheduled = false;
    render();
  });
}

function Counter() {
  const [count, setCount] = useState(0); // Hook slot #1
  const [theme, setTheme] = useState("light"); // Hook slot #2
  console.log("render snapshot:", { count, theme });
  return {
    increment: () => setCount((value) => value + 1),
    toggle: () => setTheme(theme === "light" ? "dark" : "light"),
  };
}

let ui: ReturnType<typeof Counter> | undefined;
function render() {
  currentHookIndex = 0; // 每次 render 从第一个 Hook 开始
  ui = Counter();
}

render();
ui?.increment();
