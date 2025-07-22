<script lang="ts" setup>
const { init } = useAuthStore();
await init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main>
      <AppNavBar />
      <slot />
    </main>
  </div>
</template>
