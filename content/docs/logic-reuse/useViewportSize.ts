import { useEffect, useState } from "react";

type ViewportSize = {
  height: number;
  width: number;
};

export function useViewportSize() {
  const [size, setSize] = useState<ViewportSize>({ height: 0, width: 0 });

  useEffect(() => {
    function updateSize() {
      setSize({ height: window.innerHeight, width: window.innerWidth });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    ...size,
    label: size.width < 768 ? "窄屏" : "宽屏",
  };
}

