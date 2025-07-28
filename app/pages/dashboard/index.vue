<script setup lang="ts">
const locationStore = useLocationsStore();
const { data, pending } = storeToRefs(locationStore);

onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl mb-4">
      Locations
    </h2>

    <div v-if="pending">
      <span class="loading loading-spinner loading-xl" />
    </div>

    <div v-else-if="data" class="flex flex-warp gap-2">
      <div
        v-for="location in data"
        :key="location.id"
        class="card card-compact bg-base-300 h-40 w-72"
      >
        <div class="card-body">
          <h3 class="text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>

    <div v-if="!pending && data.length <= 0" class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink class="btn btn-primary w-40" to="/dashboard/add">
        Add Location
        <Icon name="tabler:circle-plus-filled" />
      </NuxtLink>
    </div>
  </div>
</template>
