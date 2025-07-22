<script lang="ts" setup>
const route = useRoute();
const error = route.query.error || "An unknown error occurred.";
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col items-center justify-center gap-4">
    <div role="alert" class="alert alert-error w-[50%]">
      <span>Oh no! {{ error }}</span>
    </div>

    <NuxtLink to="/" class="btn btn-primary w-[50%]">
      Home
      <Icon name="tabler:home" size="32" />
    </NuxtLink>
  </div>
</template>
