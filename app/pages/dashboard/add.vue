<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { InsertLocation } from "~/lib/db/schema/location";

const router = useRouter();
const submitError = ref("");
const submitted = ref(false);
const loading = ref(false);
const { $csrfFetch } = useNuxtApp();

const { handleSubmit, errors, meta, setErrors, resetForm } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "POST",
      body: values,
    });
    submitted.value = true;
    resetForm();
  }
  catch (e) {
    const error = e as FetchError;
    setErrors(error.data);
    submitError.value = error.statusMessage || "An unknown error occurred.";
  }
  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      "Are you sure you want to leave? All unsaved changes will be lost.",
    );
    if (!confirm) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-4">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm" />
    </div>
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <span>{{ submitError }}</span>
    </div>
    <form
      class="flex flex-col gap-4"
      @submit="onSubmit"
    >
      <AppFormField
        name="name"
        label="Name"
        type="text"
        :error-message="errors.name"
        :disabled="loading"
      />

      <AppFormField
        name="description"
        label="Description"
        type="textarea"
        :error-message="errors.description"
        :disabled="loading"
      />

      <AppFormField
        name="lat"
        label="Lat"
        type="number"
        :error-message="errors.lat"
        :disabled="loading"
      />

      <AppFormField
        name="long"
        label="Long"
        type="number"
        :error-message="errors.long"
        :disabled="loading"
      />

      <div class="self-end flex gap-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline btn-secondary"
          @click="router.back()"
        >
          <Icon name="tabler:chevron-left" size="24" />
          Cancel
        </button>

        <button
          :disabled="loading"
          type="submit"
          class="btn btn-primary"
        >
          Add
          <span v-if="loading" class="loading loading-ring loading-xl" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
