<template>
    <div class="card-basic">
        <div class="card-header">
        <slot name="header">Header por defecto</slot>
        </div>
        <div class="card-body">
        <slot>Contenido por defecto</slot>
        </div>
        <div class="card-footer">
        <slot name="footer">Footer por defecto</slot>
        </div>
    </div>
</template>
<style scoped>
.card-basic {
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.card-header {
  background: #42b883;
  color: white;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

.card-footer {
  background: #f8f9fa;
  padding: 15px;
  border-top: 1px solid #ddd;
}
</style>