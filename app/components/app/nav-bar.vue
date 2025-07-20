<template>
  <div class="navbar bg-primary text-primary-content">
    <NuxtLink to="/" class="navbar-start text-xl">
      Travel Log
    </NuxtLink>
    <div class="navbar-end">
      <AppThemeToggle />
      <button class="btn btn-accent">
        Sign In With Github
        <Icon name="tabler:brand-github" size="24" />
      </button>
    </div>
  </div>
</template>
