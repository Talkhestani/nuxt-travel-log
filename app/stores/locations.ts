import type { SELECT_LOCATION } from "~/lib/db/schema";

export const useLocationsStore = defineStore("useLocationsStore", () => {
  const { pending, data, refresh } = useFetch("/api/locations", { lazy: true });
  const sidebarStore = useSidebarStore();

  watchEffect(() => {
    if (data.value) {
      sidebarStore.locationItems = data.value.map((location: SELECT_LOCATION) => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: `/dashboard/locations/${location.id}`,
      }));
    }
    sidebarStore.isLoading = pending.value;
  });

  return {
    data,
    pending,
    refresh,
  };
});
