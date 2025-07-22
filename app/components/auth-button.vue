<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      <div v-if="authStore.user.image" class="avatar">
        <div class="w-7 rounded-full">
          <img :src="authStore.user.image">
        </div>
      </div>
      {{ authStore.user.name }}
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <NuxtLink :to="{ name: 'signout' }">
          <Icon name="tabler:logout-2" size="24" />
          Signout
        </NuxtLink>
      </li>
    </ul>
  </div>
  <button
    v-else
    :disabled="authStore.loading"
    class="btn btn-accent"
    @click="authStore.signIn"
  >
    Sign In With Github
    <span v-if="authStore.loading" class="loading loading-ring loading-xl" />
    <Icon
      v-else
      name="tabler:brand-github"
      size="24"
    />
  </button>
</template>
