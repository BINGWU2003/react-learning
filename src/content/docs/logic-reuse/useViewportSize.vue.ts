import { computed, onMounted, onUnmounted, ref } from "vue";

export function useViewportSize() {
  const width = ref(0);
  const height = ref(0);

  function updateSize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
  });
  onUnmounted(() => window.removeEventListener("resize", updateSize));

  const label = computed(() => (width.value < 768 ? "窄屏" : "宽屏"));

  return { height, label, width };
}

