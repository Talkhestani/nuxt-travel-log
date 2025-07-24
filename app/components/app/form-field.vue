<script lang="ts" setup>
defineProps<{
  errorMessage?: string;
  label: string;
  name: string;
  type?: "text" | "textarea" | "number";
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :as="type === 'textarea' ? 'textarea' : 'input'"
      :name="name"
      :type="type || 'text'"
      :class="{
        'input-error': errorMessage,
        'input': type === 'text' || 'number',
        'textarea': type === 'textarea',
      }"
      class="w-full"
      :disabled="disabled || false"
    />
    <p v-if="errorMessage" class="fieldset-label text-error">
      {{ errorMessage }}
    </p>
  </fieldset>
</template>
