<script lang="ts" setup>
defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div class="tooltip tooltip-right" :data-tip="!showLabel ? label : undefined">
    <NuxtLink
      :to="href"
      :class="{ 'bg-base-300': route.path === href, 'justify-center': !showLabel, 'justify-start': showLabel }"
      class="flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap"
    >
      <Icon :name="icon" size="24" />
      <Transition name="bounce">
        <span v-if="showLabel" class="text-nowrap">{{ label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
