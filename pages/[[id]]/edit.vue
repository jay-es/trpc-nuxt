<script setup lang="ts">
import type { TrpcError } from "~/components/TrpcErrorDisplay.vue";
import type { TodoInput } from "~/server/repositories/todo/types";

const { $client, $router } = useNuxtApp();
const route = useRoute();

const todoId = Number(route.params.id);
const { data: todo, error } = await $client.todo.findOne.useQuery(todoId, {
  server: false, // クライアントからリクエストしないと、正しいエラーが表示されない
});

const mutationError = ref<TrpcError>();

async function handleSubmit(input: TodoInput) {
  await $client.todo.update
    .mutate({ todoId, input })
    .then(() => $router.push("/"))
    .catch((err) => (mutationError.value = err));
}
</script>

<template>
  <div>
    <div v-if="error" class="alert alert-error">{{ error.message }}</div>
    <TrpcErrorDisplay :error="mutationError" />
    <TodoForm v-if="todo" :todo="todo" @submit="handleSubmit" />
  </div>
</template>
