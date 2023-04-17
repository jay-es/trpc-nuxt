<script setup lang="ts">
import type { TrpcError } from "~/components/TrpcErrorDisplay.vue";
import type { TodoInput } from "~/server/repositories/todo/types";

const { $client, $router } = useNuxtApp();

const mutationError = ref<TrpcError>();

async function handleSubmit(input: TodoInput) {
  await $client.todo.add
    .mutate(input)
    .then(() => $router.push("/"))
    .catch((err) => (mutationError.value = err));
}
</script>

<template>
  <div>
    <TrpcErrorDisplay :error="mutationError" />
    <TodoForm @submit="handleSubmit" />
  </div>
</template>
