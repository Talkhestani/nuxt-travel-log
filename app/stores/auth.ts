import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("authStore", () => {
  const { csrf } = useCsrf();
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);
  const user = computed(() => session.value?.data?.user ?? null);
  const loading = computed(() => session.value?.isPending ?? true);

  async function init() {
    const data = await authClient.useSession(useFetch);

    session.value = data;
  }

  async function signIn() {
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo("/");
  }

  return {
    loading,
    user,
    signIn,
    signOut,
    init,
  };
});
