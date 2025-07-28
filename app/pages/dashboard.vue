<script lang="ts" setup>
const isToggle = ref<boolean>(true);
const sidebarStore = useSidebarStore();
const locationStore = useLocationsStore();

const route = useRoute();

function handleToggle() {
  localStorage.setItem("isSidebarOpen", String(!isToggle.value));
  isToggle.value = !isToggle.value;
}

onMounted(() => {
  const toggleStatus = localStorage.getItem("isSidebarOpen");
  isToggle.value = toggleStatus === "true";

  if (route.path === "/dashboard") {
    locationStore.refresh();
  }
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
          v-for="(link, index) in sidebarStore.sidebarItems"
          :key="index"
          :icon="link.icon"
          :label="link.label"
          :href="link.href || '#'"
          :show-label="isToggle"
        />

        <div v-if="sidebarStore.locationItems.length > 0" class="divider" />

        <div v-if="sidebarStore.isLoading && sidebarStore.locationItems.length > 0" class="skeleton h-4 w-[80%] mx-auto" />
        <div v-else-if="sidebarStore.locationItems.length > 0" class="flex flex-col">
          <SidebarButton
            v-for="(link, index) in sidebarStore.locationItems"
            :key="index"
            :icon="link.icon"
            :label="link.label"
            :href="link.href || '#'"
            :show-label="isToggle"
          />
        </div>

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
      <NuxtPage />
    </div>
  </div>
</template>
