<template>
  <section class="card">
    <span class="badge">Vue scoped</span>
    <h2>局部作用域卡片</h2>
    <p>模板使用普通 class，编译器自动添加作用域属性。</p>
    <span class="button">仅影响当前组件</span>
  </section>
</template>

<style scoped>
.card {
  display: grid;
  gap: 0.75rem;
  padding: 1.1rem;
  border: 1px solid #83d7b1;
  border-radius: 0.85rem;
  color: #174331;
  background: #ecfff5;
}

.card h2,
.card p {
  margin: 0;
}

.badge {
  width: max-content;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  color: #176947;
  font-size: 0.7rem;
  font-weight: 800;
  background: #c9f5df;
}

.button {
  width: max-content;
  border: 0;
  border-radius: 0.55rem;
  padding: 0.55rem 0.75rem;
  color: #fff;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 750;
  background: #2f855f;
}
</style>
