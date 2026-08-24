type ReactiveEffect = () => void;

const dependencies = new Map<PropertyKey, Set<ReactiveEffect>>();
let activeEffect: ReactiveEffect | null = null;

function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(source, key) {
      if (activeEffect) {
        const effects = dependencies.get(key) ?? new Set();
        effects.add(activeEffect);
        dependencies.set(key, effects); // track
      }
      return Reflect.get(source, key);
    },
    set(source, key, value) {
      const changed = Reflect.get(source, key) !== value;
      const updated = Reflect.set(source, key, value);
      if (changed) dependencies.get(key)?.forEach((run) => run()); // trigger
      return updated;
    },
  });
}

function effect(callback: ReactiveEffect) {
  const run = () => {
    activeEffect = run;
    try {
      callback();
    } finally {
      activeEffect = null;
    }
  };

  run();
}

function setupComponent() {
  // setup 只执行一次，闭包继续持有同一个响应式对象
  const state = reactive({ count: 0, theme: "light" });

  effect(() => {
    console.log("render snapshot:", state.count, state.theme);
  });

  return {
    increment: () => (state.count += 1),
    toggle: () => (state.theme = state.theme === "light" ? "dark" : "light"),
  };
}

const actions = setupComponent();
actions.toggle();
actions.increment();
