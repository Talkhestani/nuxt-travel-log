export type SidebarItem = {
  label: string;
  icon: string;
  href?: string;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([
    { label: "Locations", icon: "tabler:map", href: "/dashboard" },
    { label: "Add Location", icon: "tabler:plus", href: "/dashboard/add" },
  ]);
  const locationItems = ref<SidebarItem[]>([]);
  const isLoading = ref<boolean>(true);

  return { sidebarItems, locationItems, isLoading };
});
