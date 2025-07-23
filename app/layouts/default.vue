<script lang="ts" setup>
const { init } = useAuthStore();
await init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>
