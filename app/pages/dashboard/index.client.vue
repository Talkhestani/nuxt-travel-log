<script lang="ts" setup>
const isToggle = ref<boolean>(true);

const SIDEBAR_LINKS: {
  label: string;
  icon: string;
  href: string;
}[] = [
  { label: "Locations", icon: "tabler:map", href: "/dashboard" },
  { label: "Add Location", icon: "tabler:plus", href: "/dashboard/add" },
];

function handleToggle() {
  localStorage.setItem("isSidebarOpen", String(!isToggle.value));
  isToggle.value = !isToggle.value;
}

onMounted(() => {
  const toggleStatus = localStorage.getItem("isSidebarOpen");
  isToggle.value = toggleStatus === "true";
});
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-200 transition-all duration-300" :class="{ 'w-64': isToggle, 'w-16': !isToggle }">
      <div
        class="flex hover:cursor-pointer hover:bg-base-300 p-3 mb-2"
        :class="{ 'justify-center': !isToggle, 'justify-end': isToggle }"
        @click="handleToggle()"
      >
        <Icon
          v-if="isToggle"
          name="tabler:chevron-left"
          size="24"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="24"
        />
      </div>
      <div class="flex flex-col">
        <SidebarButton
          v-for="(link, index) in SIDEBAR_LINKS"
          :key="index"
          :icon="link.icon"
          :label="link.label"
          :href="link.href"
          :show-label="isToggle"
        />

        <div class="divider" />

        <SidebarButton
          icon="tabler:logout-2"
          label="Signout"
          href="/signout"
          :show-label="isToggle"
        />
      </div>
    </div>
    <div class="flex-1 p-4">
      <h1>hello world !</h1>
    </div>
  </div>
</template>
