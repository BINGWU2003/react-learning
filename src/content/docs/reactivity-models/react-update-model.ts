type SetStateAction<T> = T | ((previous: T) => T);
type StateSetter<T> = (action: SetStateAction<T>) => void;
type HookPair<T> = [state: T, setState: StateSetter<T>];

// 当前组件实例拥有的一维 Hook 槽位表（教学模型）
const componentHooks: unknown[] = [];
let currentHookIndex = 0;
let renderScheduled = false;

function useState<T>(initialState: T): HookPair<T> {
  let pair = componentHooks[currentHookIndex] as HookPair<T> | undefined;

  if (pair) {
    // 后续 render：按 Hook 调用顺序返回原来的 pair
    currentHookIndex += 1;
    return pair;
  }

  // 首次 render：创建并保存 [state, setter]
  function setState(action: SetStateAction<T>) {
    const previous = pair![0];
    pair![0] =
      typeof action === "function"
        ? (action as (value: T) => T)(previous)
        : action;
    scheduleRender();
  }

  pair = [initialState, setState];
  componentHooks[currentHookIndex] = pair;
  currentHookIndex += 1;
  return pair;
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
