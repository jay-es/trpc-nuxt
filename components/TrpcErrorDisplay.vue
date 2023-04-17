<script setup lang="ts">
import type { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "~/server/trpc/routers";

export type TrpcError = TRPCClientError<AppRouter>;

const props = defineProps<{
  error?: TrpcError;
}>();

const zodError = computed(() => props.error?.data?.zodError);
</script>

<template>
  <div v-if="error" class="alert alert-error">
    <template v-if="zodError">
      <template v-for="e in zodError.formErrors" :key="e">
        {{ e }}<br />
      </template>
      <template v-for="(v, k) in zodError.fieldErrors" :key="k">
        {{ k }}: {{ v }}<br />
      </template>
    </template>
    <template v-else>{{ error.message }}</template>
  </div>
</template>
